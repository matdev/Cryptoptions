import React, {useState} from 'react'
import CoinItem from './CoinItem'

import './HomePage.css'
import CoinDetails from "../routes/CoinDetails";
import * as MathsUtils from "../util/MathsUtils";
import {Link} from "react-router-dom";
import DataGrid from "react-data-grid";
import {useSelector} from "react-redux";
import MailchimpSubscribe from "react-mailchimp-subscribe"
import {useTranslation} from "react-i18next";

const HomePage = (props) => {

    const {i18n, t} = useTranslation();

    const mailchimp_url = "https://cryptoptions.us21.list-manage.com/subscribe/post?u=d48a8293e3b5cf0f0002e1dd7&amp;id=585fd685ef&amp;f_id=0098dee6f0";

    const SimpleForm = () => <MailchimpSubscribe url={mailchimp_url}/>

// a basic form
    const CustomForm = ({status, message, onValidated}) => {
        let email;
        const submit = () =>
            email &&
            email.value.indexOf("@") > -1 &&
            onValidated({
                EMAIL: email.value,
                LANG: i18n.language
            });

        return (
            <div>

                <div
                    className={"email_validation_form"}
                >
                    <input
                        className={"email_input"}
                        ref={node => (email = node)}
                        type="email"
                        placeholder={t("enter_your_email")}
                    />
                    {/*<br />*/}
                    <button className={"email_validation_button"} onClick={submit}>
                        {t("subscribe")}
                    </button>
                </div>
                <br/>

                {status === "sending" && <div className={"newsletter_subscription_success"}>{t("mailchimp_sending")}</div>}
                {status === "error" && (
                    <div
                        className={"newsletter_subscription_error"}
                        dangerouslySetInnerHTML={{__html: message}}
                    />
                )}
                {status === "success" && (
                    <div
                        className={"newsletter_subscription_success"}
                        dangerouslySetInnerHTML={{__html: t("mailchimp_success")}}
                    />
                )}

                {status == undefined && (
                    <div
                        className={"newsletter_subscription_success"}
                        dangerouslySetInnerHTML={{__html: "&nbsp;"}}
                    />
                )}

                <br/>
            </div>
        );
    };

    return (
        <div className='container'>

            <div className='header'>
                <br/>
                <h2 className='header_title'>{t("welcome")}</h2>
                <h3 className='header_text'>{t("home_intro_1")}
                    <br/>
                    <br/>
                    {t("home_intro_2")}
                    <br/>
                    <br/>
                    {t("home_intro_3")}
                    <br/>
                </h3>

                <div className='header_text'>
                    <MailchimpSubscribe
                        url={mailchimp_url}
                        render={({subscribe, status, message}) => (
                            <CustomForm
                                status={status}
                                message={message}
                                onValidated={formData => subscribe(formData)}
                            />
                        )}
                    />

                    <h3 className='header_text'>{t("home_intro_4")}</h3>
                </div>

                <h2 className='table_title'>{t("home_table_title")}</h2>
            </div>

            <div>
                <div className='heading'>
                    <p className='hide-mobile'>#</p>
                    <p className='coin-header-cell'>{t("coin")}</p>
                    <p className='coin-header-cell'>{t("price")}</p>
                    <p className='coin-header-cell'>24 h</p>
                    <p className='hide-mobile'>{t("volume_24h")}</p>
                    <p className='placeholder'></p>
                    <p className='placeholder hide-mobile'></p>
                </div>

                {(props.coins != undefined) &&
                    props.coins.map(coin => {
                        return (
                            <CoinItem key={coin.id} coin={coin} spotValue={coin.current_price}
                                      state={{spotValue: coin.current_price}}/>
                        )
                    })
                }

                {(props.coins == undefined) &&
                    <div className={'data-not-available'}>
                        <p>
                            {t("data_access_limited")}
                        </p>
                        <div className={'data_not_available_buttons'}>
                            <br/>
                            <Link to={`/coin/bitcoin`} element={<CoinDetails/>}>
                                <p>
                                    <button className={"button_view_chart"}>{t("bitcoin_infos")}</button>
                                </p>
                            </Link>

                            <Link to={`/coin/ethereum`} element={<CoinDetails/>}>
                                <p>
                                    <button className={"button_view_chart"}>{t("ethereum_infos")}</button>
                                </p>
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default HomePage