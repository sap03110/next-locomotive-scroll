'use client';

import 'locomotive-scroll/dist/locomotive-scroll.min.css';

import { ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import type LocomotiveScroll from 'locomotive-scroll';

const LocomotiveScrollProvider = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<LocomotiveScroll | null>(null);
  const path = usePathname();

  const scroll = scrollRef.current;

  useEffect(() => {
    if (!containerRef.current) return;

    const loadLocomotiveScroll = async () => {
      const { default: LocomotiveScroll } = await import('locomotive-scroll');

      const newScroll = new LocomotiveScroll({
        el: containerRef.current as HTMLElement,
        smooth: true,
        resetNativeScroll: true,
        smartphone: { smooth: true },
      });
      scrollRef.current = newScroll;
    };
    loadLocomotiveScroll();

    const handleUpdateScroll = () => {
      try {
        scroll?.update();
      } catch {}
    };

    window.addEventListener('DOMContentLoaded', handleUpdateScroll);
    window.addEventListener('resize', handleUpdateScroll);

    return () => {
      window.removeEventListener('DOMContentLoaded', handleUpdateScroll);
      window.removeEventListener('resize', handleUpdateScroll);
      scroll?.destroy();
      scrollRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      window.dispatchEvent(new Event('resize'));
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!scroll) return;

    // 페이지 이동시 초기화 처리
    scroll?.scrollTo(0, { duration: 0 });
  }, [path, scroll]);

  return (
    <main data-scroll-container ref={containerRef}>
      {children}
    </main>
  );
};

export default LocomotiveScrollProvider;
