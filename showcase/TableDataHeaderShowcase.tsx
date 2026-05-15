import React from 'react'
import { TableDataHeader } from '../src/components/TableDataHeader/TableDataHeader'

export function TableDataHeaderShowcase() {
  return (
    <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 40 }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>TableDataHeader</h2>

      {/* 모든 variant 나란히 */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ margin: 0, fontSize: 12, color: '#666' }}>hasRequired=true, hasTrailing=true (default)</p>
        <TableDataHeader>항목명</TableDataHeader>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ margin: 0, fontSize: 12, color: '#666' }}>hasRequired=true, hasTrailing=false</p>
        <TableDataHeader hasTrailing={false}>항목명</TableDataHeader>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ margin: 0, fontSize: 12, color: '#666' }}>hasRequired=false, hasTrailing=false</p>
        <TableDataHeader hasRequired={false} hasTrailing={false}>항목명</TableDataHeader>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ margin: 0, fontSize: 12, color: '#666' }}>hasRequired=false, hasTrailing=true</p>
        <TableDataHeader hasRequired={false}>항목명</TableDataHeader>
      </section>

      {/* Key-Value 테이블 조합 예시 */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ margin: 0, fontSize: 12, color: '#666' }}>Key-Value 테이블 조합 예시</p>
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--sys-border-neutral-weak)' }}>
          {[
            { label: '이름', required: true, trailing: false, value: '홍길동' },
            { label: '이메일', required: true, trailing: true, value: 'hong@example.com' },
            { label: '설명', required: false, trailing: false, value: '선택 항목입니다' },
          ].map((row) => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'stretch', borderBottom: '1px solid var(--sys-border-neutral-weak)' }}>
              <TableDataHeader hasRequired={row.required} hasTrailing={row.trailing}>
                {row.label}
              </TableDataHeader>
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                padding: '12px 20px',
                fontFamily: 'var(--semantic-body-14-regular-fontFamily)',
                fontSize: 'var(--semantic-body-14-regular-fontSize)',
                color: 'var(--sys-content-neutral-default)',
              }}>
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
