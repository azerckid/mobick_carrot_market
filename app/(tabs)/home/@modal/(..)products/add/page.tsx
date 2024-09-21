"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // 페이지 리로드
    window.location.reload();
  }, []);

  return null; // 컴포넌트 자체는 아무것도 렌더링하지 않음
}
