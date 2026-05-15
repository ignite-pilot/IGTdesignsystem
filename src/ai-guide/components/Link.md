<!-- Generated from figma-spec.json | extractedAt: 2026-05-01T17:35:25.942Z -->

# Link

앵커(`<a>`) 기반 인라인 링크. tone과 밑줄 방식 제어.

## 폰트 정책 (중요)

Link는 **본문 흐름에 박히는 inline 요소**다. 폰트 크기는 부모 컨텍스트를 상속한다.

| 속성 | 정책 |
|------|------|
| `font-family` | 부모 상속 (`font: inherit`) |
| `font-size` | 부모 상속 |
| `line-height` | 부모 상속 |
| `font-weight` | **semibold 고정** (링크 시각 식별) |
| `color` | tone에 따라 지정 (brand/neutral) |
| `text-decoration` | underline (정책에 따라) |

**Figma의 텍스트 스타일(`15-semibold`)은 컴포넌트 기본 표시일 뿐**, 실제 사용 시에는 부모 컨텍스트(Table 14px, Body 16px 등)를 따른다. 그래서 figma-spec의 `text-style` 값을 코드의 font-size로 직접 반영하지 않는다.

**잘못된 사용 예**:
```tsx
// ❌ Link 안에 다시 font 지정
<Link style={{ fontSize: 16 }}>...</Link>
```

**올바른 사용 예**:
```tsx
// ✅ 부모가 폰트를 정하고 Link는 상속받음
<td>{/* Table cell이 14px 지정 */}
  <Link href="/x">차량번호</Link>  {/* 자동으로 14px semibold */}
</td>
```


## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|------------|
| `tone` | `'brand' \| 'neutral'` | `'brand'` | Tone |
| `underline` | `'always' \| 'auto' \| 'none'` | `'auto'` | Underline |
| `disabled` | `boolean` | — | State=disabled |
| `children` | `ReactNode` | — | 링크 텍스트 (필수) |
| `href` | `string` | — | AnchorHTMLAttributes |
| `target` | `string` | — | AnchorHTMLAttributes |

> `AnchorHTMLAttributes<HTMLAnchorElement>` 전체를 상속합니다.

## Usage

```tsx
// 기본 (brand tone · always underline)
<Link href="/terms">이용약관</Link>

// Neutral tone (일반 텍스트 색상)
<Link tone="neutral" href="/more">더 알아보기</Link>

// Underline 변형
<Link underline="auto" href="/help">도움말</Link>
<Link underline="none" href="/skip">건너뛰기</Link>

// 새 탭
<Link href="https://example.com" target="_blank">외부 링크</Link>

// 비활성 (href 없이 UI만 표시 시)
<Link disabled>비활성 링크</Link>
```

## CSS classes

| Class | Role |
|-------|------|
| `.link` | Root anchor |
| `.link__focus-ring` | Focus ring overlay (aria-hidden) |

## Data attributes

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-tone` | brand, neutral | Color variant |
| `data-underline` | always, auto, none | Underline style |

## Underline 동작

| underline | 동작 | 권장 컨텍스트 |
|-----------|------|---------------|
| `auto` (기본값) | 평소 밑줄 없음, **hover 시 밑줄** | 테이블 셀, 카드, 리스트 — 가장 범용 |
| `always` | 항상 밑줄 | 본문 문단 안 인라인 링크 (클릭 가능성 강조) |
| `none` | 항상 없음 (hover 시에도) | 거의 사용 안 함. 정말 시각적 강조 없이 클릭만 필요할 때 |

**기본값을 그대로 쓰는 것을 권장**. 컨텍스트에 안 맞다고 느낀다면 `none`을 박기 전에 default(`auto`)가 적절한지 먼저 검토.

## NOT in Figma (avoid)

- `state` prop — hover/pressed/disabled는 CSS pseudo-class로 처리
- `Focused` prop — CSS `:focus-visible`로 처리
- `disabled` 상태에서도 `<a>` 태그 유지됨 — `aria-disabled` + `tabIndex={-1}` 처리
