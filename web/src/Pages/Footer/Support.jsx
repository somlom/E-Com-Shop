import { Suspense } from "react"

import "./Support.css"
import { Spinner } from "../../Components/Other/Spinner/Spinner"
import { Column, Row } from "../../Components/Other/Structure/Flex-Box/Flex-Box"


const Support = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Column className={"content_landing"}>
        <h1>Support</h1>
        <Row>
          inst
          tt
          yt
        </Row>
      </Column>
    </Suspense>
  )
}

export default Support