import { useRouter } from 'solito/router'

export const useNavigation = () => {
  const router = useRouter()

  const push = router.push

  return { push }
}
