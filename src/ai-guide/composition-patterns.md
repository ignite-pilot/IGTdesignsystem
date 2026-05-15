<!-- Composition patterns | extracted from TitleTransferPage canonical reference | 2026-05-15 -->

# IGT 백오피스 조합 패턴

IGT 컴포넌트를 조합해 백오피스 화면을 만들 때 따르는 패턴 모음.
**정답 샘플**: `showcase/TitleTransferPage.tsx` + `TitleTransferPage.css`

---

## 패턴 1 — 페이지 기본 구조 (GNB + LNB + Content)

백오피스 모든 페이지의 기본 레이아웃.

```
┌─────────────────────────────────────┐
│  GNB (Navigation, 전체 너비)         │
├──────────┬──────────────────────────┤
│ LNB      │  Content                 │
│ 250px    │  padding: var(--spacing-48) │
│ subtle   │  base                    │
└──────────┴──────────────────────────┘
```

```tsx
// 전체 래퍼
<div className="page-layout">
  {/* GNB — 전체 너비 최상단 */}
  <Navigation size="sm" layoutMode="full" logo={...} navItems={...} trailing={...} />

  <div className="page-body">
    {/* LNB */}
    <div className="page-lnb">
      <SideNavigation tone="accent" size="md" activeId="..." items={NAV_ITEMS} onSelect={() => {}} />
    </div>

    {/* Content */}
    <div className="page-content">
      {/* 페이지 내용 */}
    </div>
  </div>
</div>
```

```css
.page-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--sys-surface-static);   /* 외곽 = 흰색 */
}

.page-body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.page-lnb {
  width: 250px;
  flex-shrink: 0;
  background: var(--sys-background-subtle);  /* LNB = 옅은 회색 */
  padding: var(--spacing-24) var(--spacing-12);
  overflow-y: auto;
}

.page-content {
  flex: 1;
  padding: var(--spacing-48);               /* 백오피스 콘텐츠 공통 패딩 */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-40);                   /* 섹션 간 간격 */
  background: var(--sys-background-base);   /* 콘텐츠 = 흰색 */
}
```

**토큰 규칙:**
- 외곽 래퍼: `--sys-surface-static`
- LNB: `--sys-background-subtle`
- 콘텐츠: `--sys-background-base`
- 콘텐츠 패딩: `var(--spacing-48)` — 절대 `--spacing-24` 사용 금지

---

## 패턴 2 — 페이지 타이틀 섹션

페이지 제목 + 우측 주요 액션 버튼.

```tsx
<div className="page-title-section">
  <h1 className="page-title">페이지 제목</h1>
  <Button tone="primary" appearance="fill" emphasis="strong" size="md"
    leadingIcon={<Icon name="plusOutline2dp" size={16} />}>
    추가
  </Button>
</div>
```

```css
.page-title-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-title {
  margin: 0;
  font-family: var(--semantic-heading-20-bold-fontFamily);
  font-size: var(--semantic-heading-20-bold-fontSize);
  line-height: var(--semantic-heading-20-bold-lineHeight);
  font-weight: var(--semantic-heading-20-bold-fontWeight);
  letter-spacing: var(--semantic-heading-20-bold-letterSpacing);
  color: var(--sys-content-neutral-strong);
}
```

---

## 패턴 3 — 필터 섹션 (Searchbox 패턴)

필터 조건을 입력하는 회색 박스 섹션. 콘텐츠 영역과 배경색이 다름으로 분리감을 준다. **box-shadow 금지.**

```tsx
<div className="filter-section">
  <div className="filter-rows">
    {/* 필터 행들 */}
  </div>

  <Divider tone="neutral" emphasis="default" />

  {/* 버튼 그룹 */}
  <div className="filter-button-group">
    <ButtonGroup size="md" direction="horizontal" distribution="content">
      <Button tone="secondary" appearance="fill" emphasis="weak" onClick={handleReset}>초기화</Button>
      <Button tone="secondary" appearance="fill" emphasis="strong"
        leadingIcon={<Icon name="searchOutline2dp" size={16} />} onClick={handleSearch}>
        검색
      </Button>
    </ButtonGroup>
  </div>
</div>
```

```css
.filter-section {
  background: var(--sys-background-subtle);  /* 섹션 = 옅은 회색 */
  border-radius: var(--radius-4);
  padding: var(--spacing-24);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
}

.filter-rows {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-14);
}

.filter-button-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;  /* 버튼은 항상 우측 정렬 */
}
```

---

## 패턴 4 — 필터 행 (라벨 + 컨트롤)

필터 섹션 내 각 행. 라벨 140px + 컨트롤 flex:1.

```tsx
{/* 기본 행 (Select, TextField 등 h=40 컨트롤) */}
<div className="filter-row">
  <span className="filter-row-label">Label</span>
  <div className="filter-row-control">
    <Select options={...} value={...} onChange={...} width="fill" />
  </div>
</div>

{/* 인라인 컨트롤 행 (RadioBox, Checkbox — h=40보다 낮음) */}
<div className="filter-row filter-row--inline">
  <span className="filter-row-label">Label</span>
  <div className="filter-row-control">
    {/* RadioBox 그룹 또는 Checkbox 그룹 */}
  </div>
</div>
```

```css
.filter-row {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-8);
}

.filter-row-label {
  width: 140px;
  flex-shrink: 0;
  padding-top: 11px;  /* h=40 컨트롤과 수직 정렬 (Figma 실측) */
  font-family: var(--semantic-label-14-semibold-fontFamily);
  font-size: var(--semantic-label-14-semibold-fontSize);
  line-height: var(--semantic-label-14-semibold-lineHeight);
  font-weight: var(--semantic-label-14-semibold-fontWeight);
  letter-spacing: var(--semantic-label-14-semibold-letterSpacing);
  color: var(--sys-content-neutral-default);
}

/* 라디오/체크박스 행: paddingTop=8 (컨트롤이 더 낮아서) */
.filter-row--inline > .filter-row-label {
  padding-top: 8px;
}

.filter-row-control {
  flex: 1;
  min-width: 0;
}
```

**라벨 padding-top 분기:**
- h=40 컨트롤 (Select, TextField, DatePicker): `padding-top: 11px`
- 인라인 컨트롤 (RadioBox, Checkbox 그룹): `padding-top: 8px`

---

## 패턴 5 — 검색 복합 컨트롤 (Select + TextField)

검색 유형 선택 + 검색어 입력 조합.

```tsx
<div className="filter-row-control search-composite">
  <div className="search-select">
    <Select options={SEARCH_TYPE_OPTIONS} value={searchType} onChange={setSearchType} width="fill" />
  </div>
  <TextField size="md" placeholder="검색어" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
</div>
```

```css
.search-composite {
  display: flex;
  gap: var(--spacing-8);
}

.search-select {
  width: 160px;
  flex-shrink: 0;
}
```

---

## 패턴 6 — 인라인 라디오 그룹

단일 선택 필터 컨트롤. 항목 간 gap 24, padding 3px (컨트롤 수직 정렬용).

```tsx
<div className="radio-group">
  {(['all', 'on', 'off'] as const).map(val => (
    <label key={val} className="radio-item">
      <RadioBox checked={value === val} onChange={() => setValue(val)} name="field" size="md" />
      <span className="radio-item-label">{val === 'all' ? '전체' : val}</span>
    </label>
  ))}
</div>
```

```css
.radio-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-24);
  padding: 3px 0;  /* 컨트롤 수직 정렬 (Figma 실측) */
}

.radio-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  cursor: pointer;
}

.radio-item-label {
  font-family: var(--semantic-body-14-semibold-fontFamily);
  font-size: var(--semantic-body-14-semibold-fontSize);
  line-height: var(--semantic-body-14-semibold-lineHeight);
  font-weight: var(--semantic-body-14-semibold-fontWeight);
  letter-spacing: var(--semantic-body-14-semibold-letterSpacing);
  color: var(--sys-content-neutral-strong);
}
```

---

## 패턴 7 — 인라인 체크박스 그룹

다중 선택 필터 컨트롤. 항목 간 gap 24, 줄바꿈 가능.

```tsx
<div className="checkbox-group">
  {OPTIONS.map(item => (
    <label key={item} className="checkbox-item">
      <Checkbox checked={selected.includes(item)} size="md" onChange={() => handleToggle(item)} />
      <span className="checkbox-item-label">{item}</span>
    </label>
  ))}
</div>
```

```css
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-24);
  padding: 3px 0;  /* 컨트롤 수직 정렬 (Figma 실측) */
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  cursor: pointer;
}

.checkbox-item-label {
  font-family: var(--semantic-body-14-semibold-fontFamily);
  font-size: var(--semantic-body-14-semibold-fontSize);
  line-height: var(--semantic-body-14-semibold-lineHeight);
  font-weight: var(--semantic-body-14-semibold-fontWeight);
  letter-spacing: var(--semantic-body-14-semibold-letterSpacing);
  color: var(--sys-content-neutral-default);
}
```

---

## 패턴 8 — 날짜 범위 복합 컨트롤

날짜 유형 Select + DatePicker range + 단축 ChoiceChip 그룹.

```tsx
<div className="filter-row-control date-composite">
  <div className="date-select">
    <Select options={DATE_TYPE_OPTIONS} value={dateType} onChange={setDateType} width="fill" />
  </div>
  <DatePicker
    variation="range"
    size="md"
    value={dateFrom}
    endValue={dateTo}
    onRangeChange={(s, e) => { setDateFrom(s); setDateTo(e); setDatePreset('') }}
    placeholder="시작일"
    endPlaceholder="종료일"
  />
  <div className="date-preset-group">
    {DATE_PRESETS.map(p => (
      <ChoiceChip key={p.value} label={p.label} size="sm"
        selected={datePreset === p.value} onClick={() => handleDatePreset(p.value)} />
    ))}
  </div>
</div>
```

```css
.date-composite {
  display: flex;
  flex-wrap: wrap;  /* 공간 부족 시 preset 그룹 전체가 다음 줄로 */
  align-items: center;
  gap: var(--spacing-8);
}

.date-select {
  width: 160px;
  flex-shrink: 0;
}

.date-preset-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  flex-shrink: 0;  /* 칩 그룹 자체는 줄바꿈 안 함 — 그룹 단위로 이동 */
}
```

**날짜 단축 preset 로직 (handleDatePreset 표준):**
```ts
const handleDatePreset = (value: string) => {
  const next = value === datePreset ? '' : value  // 같은 값 재클릭 시 해제
  setDatePreset(next)
  if (!next) return
  const today = new Date()
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  const end = fmt(today)
  switch (next) {
    case 'today': setDateFrom(end); setDateTo(end); break
    case '7d':  { const d = new Date(today); d.setDate(d.getDate() - 7); setDateFrom(fmt(d)); setDateTo(end); break }
    case '1m':  { const d = new Date(today); d.setMonth(d.getMonth() - 1); setDateFrom(fmt(d)); setDateTo(end); break }
    case '6m':  { const d = new Date(today); d.setMonth(d.getMonth() - 6); setDateFrom(fmt(d)); setDateTo(end); break }
  }
}
```

---

## 패턴 9 — 테이블 헤더 바 (카운트 + 액션 버튼)

테이블 위에 위치. 좌측: 총 건수·선택 건수. 우측: 필터/정렬 버튼 + 액션 버튼.

```tsx
<div className="table-header-bar">
  {/* 좌측: 카운트 정보 */}
  <div className="count-info">
    <span className="count-total">{total}개</span>
    <span className="count-bullet">·</span>
    <span className="count-selected">{selected}개 선택</span>
  </div>

  {/* 우측: 버튼 그룹 */}
  <div className="table-actions">
    {/* 필터/소팅 버튼 그룹 */}
    <div className="table-action-group">
      <Button tone="secondary" appearance="outline" emphasis="weak" size="md"
        trailingIcon={<Icon name="chevronDownSmallOutline2dp" size={16} />}>
        텍스트 전체
      </Button>
      {/* 페이지 사이즈 선택 — Menu 드롭다운 */}
      <div style={{ position: 'relative' }} ref={pageSizeRef}>
        <Button tone="secondary" appearance="outline" emphasis="weak" size="md"
          trailingIcon={<Icon name="chevronDownSmallOutline2dp" size={16} />}
          onClick={() => setPageSizeOpen(v => !v)}>
          {pageSize}개씩
        </Button>
        {pageSizeOpen && (
          <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 100 }}>
            <Menu size="md">
              {[10, 20, 50].map(s => (
                <MenuItem key={s} onClick={() => { setPageSize(s); setPage(1); setPageSizeOpen(false) }}>{s}개씩</MenuItem>
              ))}
            </Menu>
          </div>
        )}
      </div>
    </div>

    {/* 테이블 액션 버튼 그룹 */}
    <div className="table-action-group">
      <Button tone="secondary" appearance="outline" emphasis="strong" size="md">버튼명</Button>
      <Button tone="primary" appearance="fill" emphasis="strong" size="md">주요 액션</Button>
    </div>
  </div>
</div>
```

```css
.table-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.count-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.count-total {
  font-family: var(--semantic-body-14-semibold-fontFamily);
  font-size: var(--semantic-body-14-semibold-fontSize);
  line-height: var(--semantic-body-14-semibold-lineHeight);
  font-weight: var(--semantic-body-14-semibold-fontWeight);
  letter-spacing: var(--semantic-body-14-semibold-letterSpacing);
  color: var(--sys-content-neutral-default);
}

.count-bullet {
  font-family: var(--semantic-body-14-semibold-fontFamily);
  font-size: var(--semantic-body-14-semibold-fontSize);
  color: var(--sys-content-neutral-weak);
}

.count-selected {
  font-family: var(--semantic-body-14-semibold-fontFamily);
  font-size: var(--semantic-body-14-semibold-fontSize);
  line-height: var(--semantic-body-14-semibold-lineHeight);
  font-weight: var(--semantic-body-14-semibold-fontWeight);
  letter-spacing: var(--semantic-body-14-semibold-letterSpacing);
  color: var(--sys-content-brand-default);  /* 선택 건수 = 브랜드 색상 */
}

.table-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-16);  /* 두 버튼 그룹 사이 간격 */
}

.table-action-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-6);  /* 그룹 내 버튼 간격 */
}
```

---

## 패턴 10 — 테이블 + 페이지네이션 그룹

테이블과 페이지네이션을 하나의 컨테이너로 묶음.

```tsx
<div className="data-section">
  {/* 카운트 + 버튼 바 */}
  <div className="table-header-bar">...</div>

  <div className="table-group">
    <div className="table-scroll-wrapper">
      <Table
        columns={columns}
        data={pagedData}
        selectable
        size="md"
        rowKey="id"
        onRowSelect={(_, selected) => setSelectedCount(...)}
      />
    </div>

    <div className="pagination-bar">
      <Pagination page={page} total={totalPages} onChange={setPage} size="md" />
    </div>
  </div>
</div>
```

```css
.data-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-12);  /* 헤더 바↔테이블 그룹 간격 */
}

.table-group {
  display: flex;
  flex-direction: column;
}

.table-scroll-wrapper {
  overflow-x: auto;
}

.pagination-bar {
  display: flex;
  justify-content: center;
  padding: var(--spacing-24) 0;  /* 페이지네이션 상하 여백 */
}
```

**Table columns 정의 패턴:**
```ts
const columns: TableColumn<DataType>[] = [
  { key: 'id', header: '번호', width: 80 },
  { key: 'name', header: '이름', width: 120 },
  {
    key: 'status',
    header: '상태',
    width: 90,
    align: 'center',
    render: (v) => <Label color={STATUS_COLOR[v]} size="sm">{v as string}</Label>,
  },
]
```

---

## 패턴 11 — 드롭다운 멀티셀렉트 (Select 트리거 + Checkbox 패널 + InputChip 태그)

Select처럼 생긴 트리거를 클릭하면 Checkbox 목록이 나오고, 선택된 항목이 InputChip으로 표시.

```tsx
const [open, setOpen] = useState(false)
const [selected, setSelected] = useState<string[]>([])
const wrapperRef = useRef<HTMLDivElement>(null)

// 외부 클릭 시 닫기
useEffect(() => {
  if (!open) return
  const handler = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false)
  }
  document.addEventListener('mousedown', handler)
  return () => document.removeEventListener('mousedown', handler)
}, [open])

<div className="multiselect-wrapper" ref={wrapperRef}>
  <div className="multiselect-trigger-area">
    <button type="button" className="select" data-appearance="outline" data-size="md" data-width="fill"
      onClick={() => setOpen(v => !v)}>
      <span className="select__value">
        <span data-placeholder="">선택해주세요.</span>
      </span>
      <span className="select__icon">
        <Icon name="chevronDownOutline2dp" size={16} aria-hidden />
      </span>
    </button>
    {open && (
      <div className="multiselect-panel">
        {OPTIONS.map(opt => (
          <label key={opt.value} className="multiselect-item">
            <Checkbox checked={selected.includes(opt.value)} size="md"
              onChange={() => setSelected(prev =>
                prev.includes(opt.value) ? prev.filter(v => v !== opt.value) : [...prev, opt.value]
              )} />
            <span className="multiselect-item-label">{opt.label}</span>
          </label>
        ))}
      </div>
    )}
  </div>
  {selected.length > 0 && (
    <div className="multiselect-chips">
      {selected.map(val => {
        const opt = OPTIONS.find(o => o.value === val)
        return opt ? (
          <InputChip key={val} label={opt.label} size="md"
            onRemove={() => setSelected(prev => prev.filter(v => v !== val))} />
        ) : null
      })}
    </div>
  )}
</div>
```

```css
.multiselect-wrapper { width: 100%; }

.multiselect-trigger-area { position: relative; }

.multiselect-panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 200;
  background: var(--sys-background-base);
  border: 1px solid var(--sys-border-neutral-subtle);
  border-radius: var(--radius-sm);
  padding: var(--spacing-4) 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);  /* hover 상태 예외 shadow */
}

.multiselect-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  padding: var(--spacing-8) var(--spacing-12);
  cursor: pointer;
}

.multiselect-item:hover { background: var(--sys-background-subtle); }

.multiselect-item-label {
  font-family: var(--semantic-body-14-semibold-fontFamily);
  font-size: var(--semantic-body-14-semibold-fontSize);
  line-height: var(--semantic-body-14-semibold-lineHeight);
  font-weight: var(--semantic-body-14-semibold-fontWeight);
  letter-spacing: var(--semantic-body-14-semibold-letterSpacing);
  color: var(--sys-content-neutral-default);
}

.multiselect-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-8);
  margin-top: var(--spacing-8);
}
```

---

## 패턴 12 — 상세/편집 Key-Value 테이블

상세 조회·편집 페이지에서 속성명(헤더셀) + 값(데이터셀)을 행으로 나열하는 테이블. 리스트 테이블(`<Table />`)과 다른 별도 패턴.

```
┌──────────────────┬─────────────────────────────────────┐
│ HeaderCell 140px │  DataCell flex:1                     │
│ bg: subtle       │  (text / input / button / chip)      │
├──────────────────┼─────────────────────────────────────┤
│ HeaderCell       │  DataCell                            │
└──────────────────┴─────────────────────────────────────┘
```

```tsx
import { TableDataHeader } from 'igt-design-system-v5'

{/* ── 테이블 컨테이너 ── */}
<div className="kv-table">

  {/* ── 읽기 전용 행 ── */}
  <div className="kv-row">
    <TableDataHeader hasRequired={false} hasTrailing={false}>타이틀</TableDataHeader>
    <div className="kv-cell">텍스트 값</div>
  </div>

  {/* ── 필수 항목 + 입력 행 ── */}
  <div className="kv-row">
    <TableDataHeader hasRequired hasTrailing={false}>항목명</TableDataHeader>
    <div className="kv-cell kv-cell--input">
      <TextField size="md" placeholder="입력해주세요" width="fill" />
    </div>
  </div>

  {/* ── 필수 + 툴팁 + Select 행 ── */}
  <div className="kv-row">
    <TableDataHeader hasRequired hasTrailing>항목명</TableDataHeader>
    <div className="kv-cell kv-cell--input">
      <Select options={OPTIONS} value={v} onChange={setV} size="md" width="fill" />
    </div>
  </div>

  {/* ── TextArea 행 ── */}
  <div className="kv-row">
    <TableDataHeader hasRequired={false} hasTrailing={false}>항목명</TableDataHeader>
    <div className="kv-cell kv-cell--input">
      <TextArea size="md" placeholder="내용을 입력해주세요" />
    </div>
  </div>

  {/* ── 버튼 액션 행 ── */}
  <div className="kv-row">
    <TableDataHeader hasRequired={false} hasTrailing={false}>항목명</TableDataHeader>
    <div className="kv-cell">
      <Button tone="secondary" appearance="outline" emphasis="strong" size="md">수정</Button>
    </div>
  </div>

</div>
```

```css
/* ── 컨테이너 ── */
.kv-table {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--sys-border-neutral-weak);
}

/* ── 행 — 구분선 소유자 ── */
.kv-row {
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid var(--sys-border-neutral-weak);
}

/* ── 데이터셀 ── */
.kv-cell {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-family: var(--semantic-body-14-regular-fontFamily);
  font-size: var(--semantic-body-14-regular-fontSize);
  line-height: var(--semantic-body-14-regular-lineHeight);
  font-weight: var(--semantic-body-14-regular-fontWeight);
  color: var(--sys-content-neutral-default);
}

/* 입력 컴포넌트(TextField / Select / TextArea) 셀 */
.kv-cell--input {
  padding: 8px 20px;
}
```

**셀 패딩 분기 (Figma 실측):**
| 셀 타입 | padding |
|---|---|
| 읽기 전용 텍스트 | `12px 20px` |
| 버튼 액션 | `12px 20px` |
| TextField / Select / TextArea | `8px 20px` |
| 멀티컬럼 내부 레이아웃 | `18px 16px` |

**입력 컴포넌트 공통 (Figma 실측):**
- 높이: `36px` (size="md" 기준)
- 보더 반경: `10px`
- 보더 색상: `rgba(0, 27, 55, 0.1)` 1px

---

## 패턴 13 — 확장 입력 셀 (Select + Chip 목록)

하나의 셀 안에 Select 트리거 + 선택된 항목을 Chip으로 표시하는 멀티밸류 입력 패턴.

```tsx
<div className="kv-row">
  <TableDataHeader hasRequired>항목명</TableDataHeader>
  <div className="kv-cell kv-cell--expanded">

    {/* 1행: Select 트리거 */}
    <Select options={OPTIONS} value={selected} onChange={setSelected} size="md" width="fill" />

    {/* 2행: 선택된 Chip 목록 */}
    {chips.length > 0 && (
      <div className="kv-chip-list">
        {chips.map(chip => (
          <div key={chip.id} className="kv-chip">
            <span className="kv-chip-label">{chip.label}</span>
            <IconButton
              tone="neutral" appearance="ghost" size="sm"
              icon={<Icon name="closeSmallOutline2dp" size={16} />}
              onClick={() => removeChip(chip.id)}
            />
          </div>
        ))}
      </div>
    )}

  </div>
</div>
```

```css
/* 확장 셀: column 레이아웃으로 Select + Chip 목록을 수직 적층 */
.kv-cell--expanded {
  padding: 8px 20px;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
}

/* Chip 목록 행 */
.kv-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* Chip 아이템 (Figma: Parts/chipItem/input) */
.kv-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  height: 36px;
  border-radius: 10px;
  background: rgba(2, 32, 71, 0.05);
  font-family: var(--semantic-label-14-semibold-fontFamily);
  font-size: var(--semantic-label-14-semibold-fontSize);
  font-weight: var(--semantic-label-14-semibold-fontWeight);
  color: #333D4B;
}
```

---

## 패턴 14 — 하단 고정 버튼 바 (Bottom Sticky Bar)

편집 페이지 하단에 항상 노출되는 저장/취소 액션 바. `.page-content` 내부에 배치하고 `position: sticky` 사용.

```tsx
{/* page-content 최하단에 위치 */}
<div className="bottom-bar">
  {/* 좌측: 뒤로/목록 이동 */}
  <Button tone="secondary" appearance="outline" emphasis="strong" size="md">
    목록으로
  </Button>

  {/* 우측: 취소 + 저장 */}
  <div className="bottom-bar-actions">
    <Button tone="secondary" appearance="fill" emphasis="weak" size="md"
      onClick={handleCancel}>
      취소
    </Button>
    <Button tone="primary" appearance="fill" emphasis="strong" size="md"
      onClick={handleSave}>
      저장
    </Button>
  </div>
</div>
```

```css
.bottom-bar {
  position: sticky;
  bottom: 0;
  /* page-content padding(var(--spacing-48))을 상쇄하고 전체 너비로 확장 */
  margin: auto calc(var(--spacing-48) * -1) calc(var(--spacing-48) * -1);
  padding: 12px var(--spacing-48);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--sys-background-base);
  border-top: 1px solid rgba(0, 27, 55, 0.1);
  z-index: 10;
}

.bottom-bar-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}
```

**버튼 조합 규칙 (Figma 실측):**
| 위치 | tone | appearance | emphasis | 용도 |
|---|---|---|---|---|
| 좌측 단독 | `secondary` | `outline` | `strong` | 목록으로 / 뒤로 |
| 우측 1번째 | `secondary` | `fill` | `weak` | 취소 |
| 우측 2번째 | `primary` | `fill` | `strong` | 저장 / 확인 |

---

## 전체 화면 조합 시 참조 순서

새 백오피스 화면 작업 시 아래 순서로 참조한다:

1. `composition-patterns.md` (이 파일) — 레이아웃·섹션 조합 패턴
2. `page-layout.md` — 토큰·배경·패딩 상세 규칙
3. `spacing-mapping.md` — spacing 토큰 선택 기준
4. `components/{Name}.md` — 개별 컴포넌트 props API
5. `showcase/TitleTransferPage.tsx` + `.css` — 정답 샘플 (판단이 모호할 때 열람)

**화면 조합에 Figma 불필요.** Figma는 새 컴포넌트(Track A) 작업 시에만 필요하다.

---

## 패턴 인덱스

| 패턴 | 화면 용도 |
|---|---|
| 1 — 페이지 기본 구조 | 모든 페이지 |
| 2 — 페이지 타이틀 섹션 | 모든 페이지 |
| 3 — 필터 섹션 | 목록·검색 페이지 |
| 4 — 필터 행 | 목록·검색 페이지 |
| 5 — 검색 복합 컨트롤 | 목록·검색 페이지 |
| 6 — 인라인 라디오 그룹 | 목록·검색 페이지 |
| 7 — 인라인 체크박스 그룹 | 목록·검색 페이지 |
| 8 — 날짜 범위 복합 컨트롤 | 목록·검색 페이지 |
| 9 — 테이블 헤더 바 | 목록·검색 페이지 |
| 10 — 테이블 + 페이지네이션 그룹 | 목록·검색 페이지 |
| 11 — 드롭다운 멀티셀렉트 | 목록·검색·편집 페이지 |
| 12 — Key-Value 테이블 | **상세·편집 페이지** |
| 13 — 확장 입력 셀 (Select + Chip) | **상세·편집 페이지** |
| 14 — 하단 고정 버튼 바 | **상세·편집 페이지** |
