import React, { BaseSyntheticEvent } from "react";

interface Field {
    name: string;
    label: string;
    type: string;
}

interface Props {
    fields: Field[]
}

const FormComponent: React.FC<Props> = ({ fields}) => {
    const handleOnChange = (e: BaseSyntheticEvent) => {
        let nama = e.target.name
    }
    return (
        <form>
            {fields.map((field, index) => (
                <div key={index}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input 
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={''}
                        onChange={handleOnChange}
                    />
                </div>
            ))}
        </form>
    )
}