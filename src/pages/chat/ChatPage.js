import React, { useState, useEffect } from "react";
import "../../css/style.css";
import "./chat.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { CornerDownLeft } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
    TooltipArrow
} from "../../components/ui/tooltip"
export const description =
    "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages."

const ChatPage = () => {
    return (
        <div className="chat-page-wrapper">
            <Header />
            <div className="chat-body-content">
                <div className="container-fluid px-0">
                    <div className="grid w-full">
                        <div className="flex flex-col">
                            <main className="flex flex-1 overflow-auto min-h-[calc(100vh_-_100px)]">
                                <div className="w-1/3 max-w-xl bg-white p-4 border-r">
                                    <h2 className="text-lg font-semibold mb-4">Heading of the chat</h2>
                                    <div className="mb-4 custom-scroll max-h-[calc(100vh_-_230px)] overflow-y-auto overflow-x-hidden">
                                        <ul className="pl-0">
                                            <li className="py-1 pl-5 border-b relative before:content-['Q.'] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:text-black before:text-xl before:font-semibold">                                                
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <button type="button" className="qa block w-full group relative active:opacity-90 hover:bg-[#ececec] p-2 text-[14px] leading-4 text-left">
                                                                <div className="relative grow overflow-hidden whitespace-nowrap max-w-md text-ellipsis"> Where do I find your physical store and what are your opening hours?   Where do I find your physical store and what are your opening hours?</div>
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent color="white" className="max-w-[500px]">
                                                            <TooltipArrow fill="white"></TooltipArrow>
                                                            <p>Where do I find your physical store and what are your opening hours?   Where do I find your physical store and what are your opening hours?</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>                                                
                                            </li>
                                            <li className="py-1 pl-5 border-b relative before:content-['Q.'] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:text-black before:text-xl before:font-semibold">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <button type="button" className="qa block w-full group relative active:opacity-90 hover:bg-[#ececec] p-2 text-[14px] leading-4 text-left">
                                                                <div className="relative grow overflow-hidden whitespace-nowrap max-w-md text-ellipsis"> Where do I find your physical store and what are your opening hours?   Where do I find your physical store and what are your opening hours?</div>
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent color="white" className="max-w-[500px]">
                                                            <TooltipArrow fill="white"></TooltipArrow>
                                                            <p>Where do I find your physical store and what are your opening hours?   Where do I find your physical store and what are your opening hours?</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>  
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="relative flex flex-1 h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 px-4 lg:col-span-2 gap-4 pt-6">
                                    <div className="w-full flex-1 text-sm overflow-y-auto max-h-[calc(100vh_-295px)] mx-auto overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring py-6">
                                        <div className="flex flex-col gap-4 px-10">
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold active:opacity-90  text-[14px] leading-4 text-left bg-gray-100 h-auto">What is Lorem Ipsum?</h5>
                                                </div>
                                                <div className="w-full mx-auto">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold active:opacity-90  text-[14px] leading-4 text-left bg-gray-100 h-auto">Where do I find your physical store and what are your opening hours?</h5>
                                                </div>
                                                <div className="w-full mx-auto">
                                                    <p>I don't have a physical store since I'm a virtual assistant. However, if you're looking for a specific store, I can help you find it! Let me know what you're searching for.</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-4">
                                                <div className="flex flew-wrap gap-2 items-end justify-end">
                                                    <h5 className="relative inline-block rounded-sm mr-4 mb-2 p-2.5 px-4 font-semibold active:opacity-90  text-[14px] leading-4 text-left bg-gray-100 h-auto">Where do I find your physical store and what are your opening hours?</h5>
                                                </div>
                                                <div className="w-full mx-auto">
                                                    <p>I don't have a physical store since I'm a virtual assistant. However, if you're looking for a specific store, I can help you find it! Let me know what you're searching for.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <form
                                        className="w-full mx-auto relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
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
