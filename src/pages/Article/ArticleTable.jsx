import React from "react";
import ArticleContainer from "./ArticleContainer";
import RowTable from "../../components/UI/Table/RowTable";
import { theadArticle } from "../../utils/dataObj";

export default function ArticleTable() {
  return (
    <ArticleContainer
      thead={theadArticle}
      pageFor={"homepage"}
      className={"border"}
      maxHeight={"45rem"}
    >
      <RowTable
        ifEmpty={" bidang keahlian!"}
        // data={exampleData}
        totalRow={5}
        totalCol={15}
        renderItem={(data) => {
          return (
            <tr key={data?.id}>
              <td>{data?.article_name}</td>
              <td>{data?.article_description}</td>
            </tr>
          );
        }}
      />
    </ArticleContainer>
  );
}
