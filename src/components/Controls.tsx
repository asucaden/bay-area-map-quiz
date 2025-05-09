import React from 'react'

interface ControlsProps {
  onNext: () => void
  disabled?: boolean
}

export const Controls: React.FC<ControlsProps> = ({ onNext, disabled }) => (
  <button onClick={onNext} disabled={disabled}>
    Next
  </button>
)
