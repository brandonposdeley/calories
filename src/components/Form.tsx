import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react"
import categories from "../data/categories.tsx"
import { v4 as uuidv4 } from "uuid"
import { Activity } from "../types/index.ts"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer.ts"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state:  ActivityState
}
const initialState : Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0
}
const Form = ({dispatch,state} : FormProps) => {

    const [activity,setActivity] = useState<Activity>(initialState)

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.value);

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value,
        })
    }
    const isValidateActivity = () => {
        const {name,calories} = activity;
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: "save-activity",payload : {newActivity: activity}})
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    useEffect(()=> {
        if(state.activeId){
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId) [0]
            setActivity(selectActivity)
        }
    },[state.activeId])

  return (
    <form  onSubmit={handleSubmit} className='space-y-5 bg-white rounded-lg shadow p-10'>
        <div className='grid grid-cols-1 gap-3'>
            <label htmlFor="category" className="font-bold">Cateregoria:</label>
            <select 
                className='border border-slate-300 p-2 rounded-lg w-full'
                value={activity.category}
                name="category"
                id="category"
                onChange={handleChange}
                >
            {
                categories.map(item => (
                     <option key={item.id} value={item.id}>{item.name}</option>
                ))
            }
            </select>
        </div>
        <div className='grid grid-cols-1 gap-3'>
        <label htmlFor="name" className="font-bold">Actividad:</label>
            <input 
                type="text"
                name="name"
                id="name"
                value={activity.name}
                onChange={handleChange}
                placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
            />
        </div>
        <div className='grid grid-cols-1 gap-3'>
        <label htmlFor="calories" className="font-bold">Calories:</label>
            <input 
                type="number"
                name="calories"
                id="calories"
                value={activity.calories}
                placeholder="Calories, Ej. 300 o 500"
                onChange={handleChange}
            />
        </div>
        <input 
            type="submit"
            className="disabled:opacity-10 bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
            value={activity.category === 1 ? "Guardar comida" : 'Guardar ejercicio'}
            onChange={handleChange}
            disabled={!isValidateActivity()}
        />
    </form>
  )
}

export default Form