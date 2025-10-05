import { render, screen } from '@testing-library/react'
import BotonPersonalizado from '@/components/elementos/BotonPersonalizado'
import { ReactNode } from 'react'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}))

interface MockLinkProps {
  children: ReactNode
  href: string
  [key: string]: unknown
}

// Mock de next/link
jest.mock('next/link', () => {
  const MockedLink = ({ children, href, ...props }: MockLinkProps) => {
    return <a href={href} {...props}>{children}</a>
  }
  MockedLink.displayName = 'MockedLink'
  return MockedLink
})

describe('BotonPersonalizado', () => {
  const defaultProps = {
    texto: 'Test Button',
    href: '/test-path'
  }

  it('should render button with default styles', () => {
    render(<BotonPersonalizado {...defaultProps} />)
    
    const button = screen.getByText('Test Button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-[var(--color-principal)]')
    expect(button).toHaveClass('text-white')
  })

  it('should render button with custom background and color', () => {
    render(
      <BotonPersonalizado 
        {...defaultProps}
        background="bg-red-500"
        color="text-black"
      />
    )
    
    const button = screen.getByText('Test Button')
    expect(button).toHaveClass('bg-red-500')
    expect(button).toHaveClass('text-black')
  })

  it('should render disabled button', () => {
    render(
      <BotonPersonalizado 
        {...defaultProps}
        disabled={true}
      />
    )
    
    const button = screen.getByText('Test Button')
    expect(button).toHaveClass('opacity-50')
    expect(button).toHaveClass('cursor-not-allowed')
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('should render link when not disabled', () => {
    render(<BotonPersonalizado {...defaultProps} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test-path')
  })

  it('should use custom aria-label when provided', () => {
    render(
      <BotonPersonalizado 
        {...defaultProps}
        ariaLabel="Custom aria label"
      />
    )
    
    const element = screen.getByLabelText('Custom aria label')
    expect(element).toBeInTheDocument()
  })

  it('should apply custom hover class when provided', () => {
    render(
      <BotonPersonalizado 
        {...defaultProps}
        hover="hover:bg-green-500"
      />
    )
    
    const button = screen.getByText('Test Button')
    expect(button).toHaveClass('hover:bg-green-500')
  })
})