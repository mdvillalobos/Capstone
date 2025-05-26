import axios from "axios"
import useToast from "../Helpers/useToast"


const useUpdateApprovers = () => {
    const { Toast, LoadingToast } = useToast()
    const updateApprover = async (approverList) => {
        console.log(approverList)
        LoadingToast.fire({ title: 'Updating approvers...'})

        try {
            const { data } = await axios.post('/api/updateApproverList', { approverList })

            if(data.error) {
                return Toast.fire({
                    icon: 'error',
                    title: data.error
                })
            }

            else {
                LoadingToast.close();
            }
        }

        catch (error) {
            console.log(`Updating Approvers in Frontend Error: ${ error.message }`)
        }
    }

    return { updateApprover }
}

export default useUpdateApprovers
