import React from "react";
import { LocaleConsumer } from "../context/LocaleContext";

const NotFoundPage = () => {
    return (
        <LocaleConsumer>
        {
            ({locale})=> {
                return (
                    <div>
                        <h2>404</h2>
                        <p>{locale === "id" ? "Halaman tidak ditemukan" : "Page is not found"}</p>
                    </div>
                )
            }
        }
        </LocaleConsumer>
    );
}

export default NotFoundPage;