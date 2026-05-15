<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T07:38:01.000Z -->

# Drawer

슬라이드 인 패널 오버레이. Backdrop + DrawerPanel(Header + Body + Footer). Radix Dialog 기반.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| open | `boolean` | - | 표시 여부 |
| onOpenChange | `(open: boolean) => void` | - | 상태 변경 핸들러 |
| placement | `'left' \| 'right'` | `'right'` | 패널 슬라이드 방향 |
| size | `'sm' \| 'md' \| 'lg'` | `'sm'` | 패널 너비 (sm/md: 360px, lg: 640px) |
| title | `string` | - | 헤더 제목 |
| description | `string` | - | 헤더 부제 설명 |
| children | `ReactNode` | - | 본문 콘텐츠 |
| primaryLabel | `string` | - | 기본 액션 버튼 레이블 |
| onPrimary | `() => void` | - | 기본 액션 핸들러 |
| secondaryLabel | `string` | - | 보조 액션 버튼 레이블 |
| onSecondary | `() => void` | - | 보조 액션 핸들러 |
| tertiaryLabel | `string` | - | 세 번째 액션 레이블 (`between` 레이아웃 왼쪽 배치, danger ghost 스타일) |
| onTertiary | `() => void` | - | 세 번째 액션 핸들러 |
| footerVariation | `'primary' \| 'neutral' \| 'danger'` | `'primary'` | 기본 액션 버튼 색상 |
| footerLayout | `'inlineEnd' \| 'stack' \| 'between'` | `'inlineEnd'` | 푸터 버튼 배치 방식 |

## Figma → Code 매핑

### Placement

| Figma | Code |
|-------|------|
| left | `'left'` |
| right | `'right'` |

### Size (DrawerPanel, nodeId: 730:21031)

| Figma | Code | 너비 |
|-------|------|------|
| sm | `'sm'` | 360px |
| md | `'md'` | 360px |
| lg | `'lg'` | 640px |

### Footer Variation (◇ Part / Footer, nodeId: 2302:43353)

Footer 버튼은 IGT `<Button>` 컴포넌트로 위임 렌더된다. `footerVariation` 은 Button 의 `tone/appearance/emphasis` 조합으로 매핑된다.

| footerVariation | Primary 버튼 Button props | Secondary 버튼 Button props |
|-----------------|---------------------------|------------------------------|
| `'primary'` (기본) | `tone="primary" appearance="fill" emphasis="strong"` | `tone="secondary" appearance="fill" emphasis="weak"` |
| `'neutral'` | `tone="secondary" appearance="fill" emphasis="weak"` | 동일 |
| `'danger'` | `tone="danger" appearance="fill" emphasis="strong"` | 동일 |

> **density 자동 반영**: footer 버튼은 raw `<button>` 이 아니라 IGT Button 위임 구조이므로 `<html data-size="compact|comfortable">`, `data-radius` 변경이 자동 적용된다.

Tertiary 버튼 (`between` 레이아웃 좌측): `tone="danger" appearance="outline" emphasis="weak"`

### Footer Layout (◇ Part / Footer, nodeId: 2302:43353)

| Figma | Code | 구조 |
|-------|------|------|
| inlineEnd | `'inlineEnd'` | 오른쪽 정렬 행 배치 |
| stack | `'stack'` | 세로 스택 (버튼 full-width) |
| between | `'between'` | 왼쪽: tertiary(ghost/danger) + 오른쪽: secondary+primary |

## 사용 예시

```tsx
// 기본 (오른쪽, primary/inlineEnd)
<Drawer
  open={isOpen}
  onOpenChange={setIsOpen}
  title="설정"
  description="시스템 환경을 변경합니다."
  primaryLabel="저장"
  onPrimary={handleSave}
  secondaryLabel="취소"
  onSecondary={handleCancel}
>
  <SettingsContent />
</Drawer>

// 왼쪽, 대형 (640px)
<Drawer placement="left" size="lg" open={isOpen} onOpenChange={setIsOpen} title="메뉴">
  <NavContent />
</Drawer>

// danger / stack
<Drawer
  open={isOpen}
  onOpenChange={setIsOpen}
  title="삭제 확인"
  footerVariation="danger"
  footerLayout="stack"
  primaryLabel="삭제"
  onPrimary={handleDelete}
  secondaryLabel="취소"
  onSecondary={handleCancel}
>
  <p>정말 삭제하시겠습니까?</p>
</Drawer>

// between — 왼쪽 tertiary(삭제) + 오른쪽 취소+저장
<Drawer
  open={isOpen}
  onOpenChange={setIsOpen}
  title="편집"
  footerVariation="primary"
  footerLayout="between"
  tertiaryLabel="삭제"
  onTertiary={handleDelete}
  secondaryLabel="취소"
  onSecondary={handleCancel}
  primaryLabel="저장"
  onPrimary={handleSave}
>
  <EditForm />
</Drawer>

// Header 없음 (body만)
<Drawer
  open={isOpen}
  onOpenChange={setIsOpen}
  primaryLabel="완료"
  onPrimary={handleClose}
>
  <CustomContent />
</Drawer>
```

## NOT in Figma (avoid)

- `between` 레이아웃에서 `tertiaryLabel` 없이 사용 — tertiary 슬롯이 비어 `between` 의미가 없음
- Footer 없이 `footerVariation` / `footerLayout` 지정 — 무시됨
