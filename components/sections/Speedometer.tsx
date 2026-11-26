"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

const DURATION = 1800;

// Геометрия циферблата в координатах SVG
const CX = 110;
const CY = 112.1;
const RADIUS = 88.5;

// Диапазон, по которому движется стрелка и растёт заливка
const START_ANGLE = 180;
const END_ANGLE = 60;

// Деления занимают всю дугу
const DIAL_START = 175;
const DIAL_END = 5;
const TICK_COUNT = 17;
const TICK_OUTER_RADIUS = 82;
const TICK_INNER_RADIUS = 76;
const TICK_COLOR = "#FFFFFF";
const TICK_OPACITY_REACHED = 0.55; // стрелка уже прошла деление
const TICK_OPACITY_IDLE = 0.16; // ещё не прошла

function getSectorPath(progress: number) {
    if (progress <= 0) return "";

    const angle =
        (START_ANGLE + (END_ANGLE - START_ANGLE) * progress) *
        (Math.PI / 180);

    const startX = CX - RADIUS;
    const startY = CY;

    const endX = CX + RADIUS * Math.cos(angle);
    const endY = CY - RADIUS * Math.sin(angle);

    return `
        M ${CX} ${CY}
        L ${startX} ${startY}
        A ${RADIUS} ${RADIUS} 0 0 1 ${endX} ${endY}
        Z
    `;
}

// Считаем один раз, а не на каждом кадре анимации
const TICKS = Array.from({ length: TICK_COUNT }, (_, i) => {
    const angle = DIAL_START - (i * (DIAL_START - DIAL_END)) / (TICK_COUNT - 1);
    const rad = angle * (Math.PI / 180);

    return {
        angle,
        x1: CX + TICK_OUTER_RADIUS * Math.cos(rad),
        y1: CY - TICK_OUTER_RADIUS * Math.sin(rad),
        x2: CX + TICK_INNER_RADIUS * Math.cos(rad),
        y2: CY - TICK_INNER_RADIUS * Math.sin(rad),
    };
});

export default function Speedometer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    // useId возвращает значение с двоеточиями, а для url(#...) они не нужны
    const gradientId = `sector-fill-${useId().replace(/:/g, "")}`;

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) {
            setProgress(1);
            return;
        }

        let animationFrame = 0;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                observer.disconnect();

                const startTime = performance.now();

                const animate = (now: number) => {
                    const elapsed = now - startTime;
                    const linear = Math.min(elapsed / DURATION, 1);

                    // Плавное замедление в конце
                    const eased = 1 - Math.pow(1 - linear, 4);

                    setProgress(eased);

                    if (linear < 1) {
                        animationFrame = requestAnimationFrame(animate);
                    }
                };

                animationFrame = requestAnimationFrame(animate);
            },
            { threshold: 0.35 }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    const needleAngle = -90 + progress * 120;
    // тот же угол стрелки в градусах окружности (180 слева, 0 справа)
    const needleDegrees = START_ANGLE - progress * (START_ANGLE - END_ANGLE);

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="relative mx-auto aspect-[220/118] w-full max-w-[300px] xl:w-[300px] xl:max-w-none"
        >
            {/* Основа спидометра без стрелки и заливки */}
            <Image
                src="/images/speedometer-base.png"
                alt=""
                fill
                sizes="(min-width: 1280px) 420px, 300px"
                className="object-contain"
            />

            {/* Анимированная заливка */}
            <svg
                viewBox="0 0 220 118"
                className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-30"
            >
                <defs>
                    <linearGradient id={gradientId} x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF4015" stopOpacity="1" />
                        <stop offset="30%" stopColor="#7A1A00" stopOpacity="1" />
                        <stop offset="65%" stopColor="#0E0F10" stopOpacity="1" />
                        <stop offset="100%" stopColor="#0E0F10" stopOpacity="1" />
                    </linearGradient>
                </defs>

                <path d={getSectorPath(progress)} fill={`url(#${gradientId})`} />
            </svg>

            {/* Циферблат: деления по всей дуге */}
            <svg
                viewBox="0 0 220 118"
                className="pointer-events-none absolute inset-0 z-[15] h-full w-full"
            >
                {TICKS.map((tick, index) => {
                    const reached = tick.angle >= needleDegrees - 0.01;

                    return (
                        <line
                            key={index}
                            x1={tick.x1}
                            y1={tick.y1}
                            x2={tick.x2}
                            y2={tick.y2}
                            stroke={TICK_COLOR}
                            strokeWidth="0.5"
                            strokeLinecap="round"
                            style={{
                                opacity: reached ? TICK_OPACITY_REACHED : TICK_OPACITY_IDLE,
                                transition: "opacity 160ms linear",
                            }}
                        />
                    );
                })}
            </svg>

            {/* Стрелка */}
            <div
                className="absolute z-20"
                style={{
                    left: "50%",
                    bottom: "5%",
                    width: "6px",
                    height: "75%",
                    transform: `translateX(-50%) rotate(${needleAngle}deg)`,
                    transformOrigin: "50% 100%",
                }}
            >
                <div
                    className="h-full w-full rounded-full bg-[#F04B2B]"
                    style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
                />
            </div>

            {/* Центральная точка стрелки */}
            <div
                className="absolute z-30 size-[7px] rounded-full bg-[#F04B2B]"
                style={{
                    left: "50.6%",
                    top: "93%",
                    transform: "translate(-50%, -50%)",
                }}
            />
        </div>
    );
}