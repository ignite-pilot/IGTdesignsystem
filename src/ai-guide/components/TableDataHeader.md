<!-- Generated from figma-spec.json | extractedAt: 2026-05-15 | node: 6198:70551 (guRwzd5hH02rnIGu6OBRzD) -->

# TableDataHeader

상세·편집 페이지의 Key-Value 테이블에서 왼쪽 헤더 셀로 사용하는 컴포넌트.
리스트 테이블의 `Table` 컴포넌트와 별개.

## Props

| prop | type | default | 설명 |
|---|---|---|---|
| `children` | `ReactNode` | — | 헤더 라벨 텍스트 |
| `hasRequired` | `boolean` | `true` | 필수 항목 표시 (빨간 3선 asterisk SVG) |
| `hasTrailing` | `boolean` | `true` | 우측 trailing 아이콘 표시 (questionCircleOutline2dp) |
| `className` | `string` | — | 추가 클래스 |

## 사용 예시

```tsx
import { TableDataHeader } from 'igt-design-system-v5'

{/* 기본 (required + trailing 모두 표시) */}
<TableDataHeader>항목명</TableDataHeader>

{/* 필수 항목만 (trailing 없음) */}
<TableDataHeader hasTrailing={false}>항목명</TableDataHeader>

{/* 선택 항목 (required 없음, trailing 없음) */}
<TableDataHeader hasRequired={false} hasTrailing={false}>항목명</TableDataHeader>
```

## Key-Value 테이블 조합

`composition-patterns.md 패턴 12` 참조. TableDataHeader는 항상 `kv-row` 안에 배치.

```tsx
<div className="kv-table">
  <div className="kv-row">
    <TableDataHeader hasRequired>이름</TableDataHeader>
    <div className="kv-cell kv-cell--input">
      <TextField size="md" width="fill" />
    </div>
  </div>
  <div className="kv-row">
    <TableDataHeader hasRequired={false} hasTrailing={false}>설명</TableDataHeader>
    <div className="kv-cell">텍스트 값</div>
  </div>
</div>
```

```css
.kv-table { display: flex; flex-direction: column; border-top: 1px solid var(--sys-border-neutral-weak); }
.kv-row   { display: flex; align-items: stretch; border-bottom: 1px solid var(--sys-border-neutral-weak); }
.kv-cell  { flex: 1; min-width: 0; display: flex; align-items: center; padding: 12px 20px; }
.kv-cell--input { padding: 8px 20px; }
```

## 토큰

| 속성 | 토큰 |
|---|---|
| 배경 | `--sys-surface-grouped-default` |
| 하단 보더 | 없음 — `kv-row` 컨테이너가 소유 (`--sys-border-neutral-weak` 1px) |
| 타이틀 색상 | `--sys-content-neutral-default` |
| 타이틀 타이포 | `--semantic-body-14-semibold` |
| trailing icon 색상 | `--sys-content-neutral-subtle` |
| required mark 색상 | `#F04452` (토큰 없음 — 하드코드 유지) |

## NOT in Figma (avoid)

- `width` prop 없음 — 항상 `140px` 고정
- `size` variant 없음 — 단일 사이즈
- required mark를 커스텀 색상으로 바꾸는 prop 없음
