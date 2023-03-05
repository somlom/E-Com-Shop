import { useTranslation } from 'react-i18next';

import { Card } from '../Layout/Card/Card';


const Details = ({ data }) => {

    const [t] = useTranslation();

    return (
        <Card>
            <h2>{t("details")}</h2>
            <p>{data}</p>
        </Card>
    )
}

export default Details