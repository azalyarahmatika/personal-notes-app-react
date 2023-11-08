import React from "react";
import { LocaleConsumer } from "../context/LocaleContext";

const EmptyList = () => {
    return (
        <LocaleConsumer>
            {
                ({locale})=> {
                    return (
                        <div className="notes-list-empty">
                            <p>{locale==="id" ? "Daftar Catatan Kosong" : "Empty Note List"}</p>
                        </div>
                    );
                }
            }
        </LocaleConsumer>
    )
}

export default EmptyList;