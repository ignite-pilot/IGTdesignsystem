/* Composition component | figma-node: 8016:29853 | 2026-05-15 */
import React, { useState } from 'react'
import { Button } from '../src/components/Button/Button'
import { Label } from '../src/components/Label/Label'
import { TextField } from '../src/components/TextField/TextField'
import { Select } from '../src/components/Select/Select'
import { TableDataHeader } from '../src/components/TableDataHeader/TableDataHeader'
import { Navigation, NavItem } from '../src/components/Navigation/Navigation'
import { SideNavigation } from '../src/components/SideNavigation/SideNavigation'
import type { SideNavItemData } from '../src/components/SideNavigation/SideNavigation'
import './DetailEditPage.css'

const NAV_ITEMS: SideNavItemData[] = [
  { id: 'dashboard', label: '대시보드', icon: 'homeOutline2dp' },
  { id: 'title-transfer', label: '명의이전 관리', icon: 'documentOutline2dp' },
  { id: 'vehicle', label: '차량 등록 관리', icon: 'documentPaperOutline2dp' },
  { id: 'dealer', label: '딜러 관리', icon: 'personGroupOutline2dp' },
  { id: 'customer', label: '고객 관리', icon: 'personOutline2dp' },
  { id: 'settlement', label: '정산 관리', icon: 'wonCircleOutline2dp' },
  { id: 'report', label: '보고서', icon: 'listOutline2dp' },
  { id: 'notice', label: '공지사항', icon: 'bellOutline2dp' },
  { id: 'settings', label: '설정', icon: 'settingOutline2dp' },
]

const BUSINESS_TYPE_OPTIONS = [
  { value: 'transfer', label: '명의이전' },
  { value: 'cancel', label: '명의이전취소' },
  { value: 'temp', label: '임시번호판' },
]

const GROUP_OPTIONS = [
  { value: 'a', label: 'A 그룹' },
  { value: 'b', label: 'B 그룹' },
  { value: 'c', label: 'C 그룹' },
]

export function DetailEditPage() {
  const [vehicleNo, setVehicleNo] = useState('123가 4567')
  const [vehicleModel, setVehicleModel] = useState('현대 아반떼')
  const [businessType, setBusinessType] = useState('transfer')
  const [group, setGroup] = useState('a')
  const [prevOwnerName, setPrevOwnerName] = useState('김철수')
  const [prevOwnerAddr, setPrevOwnerAddr] = useState('서울시 강남구 테헤란로 123')
  const [nextOwnerName, setNextOwnerName] = useState('홍길동')
  const [note, setNote] = useState('')

  return (
    <div className="dep-layout">
      <Navigation
        size="sm"
        layoutMode="full"
        logo={<span className="dep-nav-logo">MGWrap</span>}
        navItems={
          <>
            <NavItem label="명의이전" current />
            <NavItem label="차량관리" />
            <NavItem label="딜러관리" />
            <NavItem label="고객관리" />
            <NavItem label="정산" />
          </>
        }
        trailing={
          <Button tone="secondary" appearance="outline" emphasis="weak" size="sm">로그아웃</Button>
        }
      />

      <div className="dep-body">
        <div className="dep-lnb">
          <SideNavigation
            tone="accent"
            size="md"
            activeId="title-transfer"
            onSelect={() => {}}
            items={NAV_ITEMS}
          />
        </div>

        <div className="dep-content">

          <div className="dep-title-section">
            <h1 className="dep-page-title">명의이전 신청 수정</h1>
          </div>

          {/* KV Table 1 — 신청 정보 (read-only) */}
          <div className="dep-kv-table">
            <div className="dep-kv-row">
              <TableDataHeader hasRequired={false} hasTrailing={false}>신청번호</TableDataHeader>
              <div className="dep-kv-cell">
                <span className="dep-kv-text">TT-2026-0001</span>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired={false} hasTrailing={false}>신청일시</TableDataHeader>
              <div className="dep-kv-cell">
                <span className="dep-kv-text">2026-05-07 09:12</span>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired={false} hasTrailing={false}>신청자</TableDataHeader>
              <div className="dep-kv-cell">
                <span className="dep-kv-text">홍길동</span>
                <Button tone="secondary" appearance="outline" emphasis="strong" size="sm">상세보기</Button>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired={false} hasTrailing={false}>처리 상태</TableDataHeader>
              <div className="dep-kv-cell">
                <Label color="green" size="sm">완료</Label>
                <Button tone="secondary" appearance="outline" emphasis="strong" size="sm">변경</Button>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired={false} hasTrailing={false}>이전 소유자</TableDataHeader>
              <div className="dep-kv-cell">
                <span className="dep-kv-text">김철수</span>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired={false} hasTrailing={false}>신규 소유자</TableDataHeader>
              <div className="dep-kv-cell">
                <span className="dep-kv-text">홍길동</span>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired={false} hasTrailing={false}>처리일시</TableDataHeader>
              <div className="dep-kv-cell">
                <span className="dep-kv-text">2026-05-07 14:30</span>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired={false} hasTrailing={false}>처리 담당자</TableDataHeader>
              <div className="dep-kv-cell">
                <span className="dep-kv-text">박민준</span>
              </div>
            </div>
          </div>

          {/* KV Table 2 — 수정 내용 (editable inputs) */}
          <div className="dep-kv-table">
            <div className="dep-kv-row">
              <TableDataHeader hasRequired hasTrailing={false}>차량번호</TableDataHeader>
              <div className="dep-kv-cell dep-kv-cell--input">
                <div className="dep-expand">
                  <TextField size="md" value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired hasTrailing={false}>차종</TableDataHeader>
              <div className="dep-kv-cell dep-kv-cell--input">
                <div className="dep-expand">
                  <TextField size="md" value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired hasTrailing>업무 구분</TableDataHeader>
              <div className="dep-kv-cell dep-kv-cell--input">
                <div className="dep-expand">
                  <Select options={BUSINESS_TYPE_OPTIONS} value={businessType} onChange={setBusinessType} width="fill" />
                </div>
                <Button tone="secondary" appearance="outline" emphasis="strong" size="md">상세보기</Button>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired hasTrailing>등록 그룹</TableDataHeader>
              <div className="dep-kv-cell dep-kv-cell--input">
                <div className="dep-expand">
                  <Select options={GROUP_OPTIONS} value={group} onChange={setGroup} width="fill" />
                </div>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired hasTrailing={false}>이전 소유자명</TableDataHeader>
              <div className="dep-kv-cell dep-kv-cell--input">
                <div className="dep-expand">
                  <TextField size="md" value={prevOwnerName} onChange={e => setPrevOwnerName(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired hasTrailing={false}>이전 소유자 주소</TableDataHeader>
              <div className="dep-kv-cell dep-kv-cell--input">
                <div className="dep-expand">
                  <TextField size="md" value={prevOwnerAddr} onChange={e => setPrevOwnerAddr(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired hasTrailing={false}>신규 소유자명</TableDataHeader>
              <div className="dep-kv-cell dep-kv-cell--input">
                <div className="dep-expand">
                  <TextField size="md" value={nextOwnerName} onChange={e => setNextOwnerName(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="dep-kv-row">
              <TableDataHeader hasRequired={false} hasTrailing={false}>비고</TableDataHeader>
              <div className="dep-kv-cell dep-kv-cell--input">
                <div className="dep-expand">
                  <TextField size="md" placeholder="비고를 입력하세요" value={note} onChange={e => setNote(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Sticky bottom bar */}
          <div className="dep-sticky-bar">
            <Button tone="secondary" appearance="outline" emphasis="strong" size="md">목록으로</Button>
            <div className="dep-sticky-bar-actions">
              <Button tone="secondary" appearance="fill" emphasis="weak" size="md">취소</Button>
              <Button tone="primary" appearance="fill" emphasis="strong" size="md">저장</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
