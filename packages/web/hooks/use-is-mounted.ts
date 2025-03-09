/* The MIT License (MIT)
 * 
 * Copyright (c) 2020 Julien CARON
 * https://github.com/juliencrn/usehooks-ts/blob/61949134144d3690fe9f521260a16c779a6d3797/LICENSE#L1
 * Code sourced from: https://github.com/juliencrn/usehooks-ts/
 */

import { useCallback, useEffect, useRef } from 'react'

/**
 * Custom hook that determines if the component is currently mounted.
 * @returns {() => boolean} A function that returns a boolean value indicating whether the component is mounted.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-is-mounted)
 * @example
 * ```tsx
 * const isComponentMounted = useIsMounted();
 * // Use isComponentMounted() to check if the component is currently mounted before performing certain actions.
 * ```
 */
export function useIsMounted(): () => boolean {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}
