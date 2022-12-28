import React from 'react'

import "../css/Products.scss"


export const Details = () => {

    // {data} must be in arg
    const data = [{ header: "Verbraucherhinweise", text: "IMEI-Information	Dein gekauftes Produkt wird mit einem RFID-Chip versehen,sodass wir ermitteln können,ob es Dich auch wirklich erreicht hat. Dein Artikel wird dadurch vor Betrugs- und Verlustfällen geschützt und wir können eine sichere Lieferung garantieren. Deine Daten bleiben dabei selbstverständlich anonym. Lediglich die auf dem Chip gespeicherte IMEI-Nummer des Artikels wird im unwahrscheinlichen Fall eines Verlusts relevant." },
    { header: "Bildschirm", text: "Zoll: 7,3''" }
    ]

    return (
        <div className='details'>
            <h2>Details</h2>
            {data.map(text => (
                <div>
                    <h3>{(text.header).toUpperCase()}</h3>
                    <p>{text.text}</p>
                </div>
            ))}
        </div>
    )
}
