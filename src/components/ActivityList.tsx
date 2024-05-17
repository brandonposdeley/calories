import { Dispatch, useMemo } from "react"
import { Activity } from "../types"
import categories from "../data/categories"
import { PencilSquareIcon , XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}
const ActivityList = ({activities,dispatch} : ActivityListProps) => {
    const categoryName = useMemo(() => 
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name  : "" )
        , [activities])

    const isEmptyActivities = useMemo(() => activities.length ===0 , [activities])
  return (
    <div className="text-4xl font-bold text-slate-600 text-center">
        {isEmptyActivities ? <p className="my-5 text-center">No hay actividades aun..</p> :
        activities.length > 0 && activities.map(item => (
            <div key={item.id} className="px-5 pt-10 bg-white mt-5 flex justify-between">
                <div className="space-y-2 relative">
                    <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${item.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>{categoryName(+item.category)}</p>
                    <p className="text-2xl font-bold pt-5">{item.name}</p>
                    <p className="font-black text-4xl text-lime-500">
                        {item.calories} {""}
                        <span>Calorias</span>
                    </p>
                </div>
                <div className="flex gap-5 items-center">
                    <button
                    onClick={()=> dispatch({type: 'set-activeId',payload : {id: item.id}})}
                    >
                        <PencilSquareIcon className='h-8 w-8 text-gray-800' />
                    </button>
                    <button
                    onClick={()=> dispatch({type: 'delete-activity',payload : {id: item.id}})}
                    >
                        <XCircleIcon className='h-8 w-8 text-red-800' />
                    </button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ActivityList