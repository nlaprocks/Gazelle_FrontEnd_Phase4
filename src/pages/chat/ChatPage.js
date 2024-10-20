import React, { useState, useEffect } from "react";
import "../../css/style.css";
import "./chat.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {
    Bird, Book, Bot, Code2, CornerDownLeft, LifeBuoy, Mic, Paperclip, Rabbit, Settings, Settings2, Share, SquareTerminal, SquareUser, Triangle, Turtle,
} from "lucide-react"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../../components/ui/tooltip"
export const description =
    "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages."

const ChatPage = () => {
    return (
        <div className="chat-page-wrapper">
            <Header />
            <div className="chat-body-content">
                <div className="container-fluid">
                    <div className="grid w-full">
                        <div className="flex flex-col">
                            <main className="flex flex-1 gap-4 overflow-auto p-4 min-h-[calc(100vh_-_120px)]">
                                <div
                                    className="relative hidden flex-col items-start gap-8 md:flex lg:w-3/12 lg:max-w-md" x-chunk="dashboard-03-chunk-0"
                                >
                                    <div className="bg-[#f7f7f7] grid w-full items-start gap-6 rounded-lg border py-4 pl-4 pr-0">
                                        <ul className="pl-0 pr-4 custom-scroll max-h-[calc(100vh_-_230px)] overflow-y-auto overflow-x-hidden">
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 active:opacity-90 hover shadow-sm:bg-[#ececec] active:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> What is Lorem ipsum?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> What's the origin of Lorem ipsum?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> When was Lorem ipsum popularized?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Where do I find your physical store and what are your opening hours?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Are you on Twitter, Facebook and other social media platforms?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Are unsold magazines sent back to the publisher?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Where can I edit my billing and shipping address?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Where can I subscribe to your newsletter?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Do you accept orders via Phone or E-mail?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> What is Lorem ipsum?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> What's the origin of Lorem ipsum?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> When was Lorem ipsum popularized?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Where do I find your physical store and what are your opening hours?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Are you on Twitter, Facebook and other social media platforms?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Are unsold magazines sent back to the publisher?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Where can I edit my billing and shipping address?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Where can I subscribe to your newsletter?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Do you accept orders via Phone or E-mail?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> What is Lorem ipsum?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> What's the origin of Lorem ipsum?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> When was Lorem ipsum popularized?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Where do I find your physical store and what are your opening hours?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Are you on Twitter, Facebook and other social media platforms?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Are unsold magazines sent back to the publisher?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Where can I edit my billing and shipping address?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Where can I subscribe to your newsletter?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="qa block w-full group relative rounded-xl border mr-4 shadow-sm active:opacity-90 hover:bg-[#ececec] p-2 mb-2 text-[14px] leading-4 text-left">
                                                    <div className="relative grow overflow-hidden whitespace-nowrap pr-4 max-w-sm text-ellipsis"> Do you accept orders via Phone or E-mail?
                                                        <div className="absolute bottom-0 top-0 to-transparent ltr:bg-gradient-to-l right-0 rtl:bg-gradient-to-r from-gray-300 can-hover:group-hover:from-token-sidebar-surface-secondary w-8 from-0% can-hover:group-hover:w-10 can-hover:group-hover:from-60%"></div>
                                                    </div>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="relative flex flex-1 h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 px-4 lg:col-span-2 lg:gap-4">
                                    <div className="flex-1 rounded-lg border p-4 text-sm bg-white overflow-y-auto max-h-[calc(100vh_-310px)]">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold bg-[#f4f4f4] active:opacity-90 hover:bg-[#ececec] text-[14px] leading-4 text-left">What is Lorem Ipsum?</h5>
                                                </div>
                                                <div className="max-w-4xl ml-auto">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold bg-[#f4f4f4] active:opacity-90 hover:bg-[#ececec] text-[14px] leading-4 text-left">Where do I find your physical store and what are your opening hours?</h5>
                                                </div>
                                                <div className="max-w-4xl ml-auto">
                                                    <p>I don't have a physical store since I'm a virtual assistant. However, if you're looking for a specific store, I can help you find it! Let me know what you're searching for.</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold bg-[#f4f4f4] active:opacity-90 hover:bg-[#ececec] text-[14px] leading-4 text-left">Where do I find your physical store and what are your opening hours?</h5>
                                                </div>
                                                <div className="max-w-4xl ml-auto">
                                                    <p>I don't have a physical store since I'm a virtual assistant. However, if you're looking for a specific store, I can help you find it! Let me know what you're searching for.</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold bg-[#f4f4f4] active:opacity-90 hover:bg-[#ececec] text-[14px] leading-4 text-left">Where do I find your physical store and what are your opening hours?</h5>
                                                </div>
                                                <div className="max-w-4xl ml-auto">
                                                    <p>I don't have a physical store since I'm a virtual assistant. However, if you're looking for a specific store, I can help you find it! Let me know what you're searching for.</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold bg-[#f4f4f4] active:opacity-90 hover:bg-[#ececec] text-[14px] leading-4 text-left">Where do I find your physical store and what are your opening hours?</h5>
                                                </div>
                                                <div className="max-w-4xl ml-auto">
                                                    <p>I don't have a physical store since I'm a virtual assistant. However, if you're looking for a specific store, I can help you find it! Let me know what you're searching for.</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold bg-[#f4f4f4] active:opacity-90 hover:bg-[#ececec] text-[14px] leading-4 text-left">Where do I find your physical store and what are your opening hours?</h5>
                                                </div>
                                                <div className="max-w-4xl ml-auto">
                                                    <p>I don't have a physical store since I'm a virtual assistant. However, if you're looking for a specific store, I can help you find it! Let me know what you're searching for.</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold bg-[#f4f4f4] active:opacity-90 hover:bg-[#ececec] text-[14px] leading-4 text-left">Where do I find your physical store and what are your opening hours?</h5>
                                                </div>
                                                <div className="max-w-4xl ml-auto">
                                                    <p>I don't have a physical store since I'm a virtual assistant. However, if you're looking for a specific store, I can help you find it! Let me know what you're searching for.</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold bg-[#f4f4f4] active:opacity-90 hover:bg-[#ececec] text-[14px] leading-4 text-left">Where do I find your physical store and what are your opening hours?</h5>
                                                </div>
                                                <div className="max-w-4xl ml-auto">
                                                    <p>I don't have a physical store since I'm a virtual assistant. However, if you're looking for a specific store, I can help you find it! Let me know what you're searching for.</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold bg-[#f4f4f4] active:opacity-90 hover:bg-[#ececec] text-[14px] leading-4 text-left">Where do I find your physical store and what are your opening hours?</h5>
                                                </div>
                                                <div className="max-w-4xl ml-auto">
                                                    <p>I don't have a physical store since I'm a virtual assistant. However, if you're looking for a specific store, I can help you find it! Let me know what you're searching for.</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold bg-[#f4f4f4] active:opacity-90 hover:bg-[#ececec] text-[14px] leading-4 text-left">Where do I find your physical store and what are your opening hours?</h5>
                                                </div>
                                                <div className="max-w-4xl ml-auto">
                                                    <p>I don't have a physical store since I'm a virtual assistant. However, if you're looking for a specific store, I can help you find it! Let me know what you're searching for.</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold bg-[#f4f4f4] active:opacity-90 hover:bg-[#ececec] text-[14px] leading-4 text-left">Where do I find your physical store and what are your opening hours?</h5>
                                                </div>
                                                <div className="max-w-4xl ml-auto">
                                                    <p>I don't have a physical store since I'm a virtual assistant. However, if you're looking for a specific store, I can help you find it! Let me know what you're searching for.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <form
                                        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
                                    >
                                        <Label htmlFor="message" className="sr-only">
                                            Message
                                        </Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Type your message here..."
                                            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                                        />
                                        <div className="flex items-center p-3 pt-0">
                                            <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                                Send Message
                                                <CornerDownLeft className="size-3.5" />
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ChatPage;
