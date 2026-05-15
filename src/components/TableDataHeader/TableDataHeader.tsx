import React from 'react'
import { Icon } from '../Icon/Icon'
import './TableDataHeader.css'

export interface TableDataHeaderProps {
  children: React.ReactNode
  hasRequired?: boolean
  hasTrailing?: boolean
  className?: string
}

export function TableDataHeader({
  children,
  hasRequired = true,
  hasTrailing = true,
  className,
}: TableDataHeaderProps) {
  return (
    <div className={['table-data-header', className].filter(Boolean).join(' ')}>
      <div className="table-data-header__container">
        <div className="table-data-header__label">
          {hasRequired && (
            <span className="table-data-header__required-area" aria-hidden>
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <g clipPath="url(#req-mark-clip)">
                  <path d="M3 0.75V5.25" stroke="#F04452" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M0.942871 1.8125L5.05649 4.1875" stroke="#F04452" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.05664 1.8125L0.94302 4.1875" stroke="#F04452" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="req-mark-clip">
                    <rect width="6" height="6" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </span>
          )}
          <span className="table-data-header__title">{children}</span>
          {hasTrailing && (
            <span className="table-data-header__icon-container">
              <Icon
                name="questionCircleOutline2dp"
                size={16}
                aria-hidden
              />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
