/* eslint eqeqeq: "off", curly: "error" */
import { useRouter } from 'next/router'

export default function Edit(){
    const router = useRouter()
    const { id } = router.query
    return (
        <p>
            ID: {id}
        </p>
    )
}