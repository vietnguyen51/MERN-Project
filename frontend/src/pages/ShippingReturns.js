import React from 'react'
import { Truck, RefreshCw, Globe, Clock, ShieldCheck, HelpCircle } from 'lucide-react'

export default function ShippingReturns() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 p-10">
            <div className="max-w-4xl w-full space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-wider">Shipping & Returns</h2>
                    <div className="mt-2 h-1 w-20 bg-black mx-auto"></div>
                    <p className="mt-4 text-sm text-gray-600 italic">
                        Luxury service from purchase to delivery and beyond
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <Truck className="h-6 w-6 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Shipping</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>Free standard shipping on all orders over $500</li>
                            <li>Express shipping available for an additional fee</li>
                            <li>International shipping to over 100 countries</li>
                            <li>Typical delivery time: 3-5 business days (domestic)</li>
                        </ul>
                    </div>
                    <div className="bg-gray-50 p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <RefreshCw className="h-6 w-6 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Returns</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>Free returns within 30 days of purchase</li>
                            <li>Items must be unworn, unwashed, and in original condition</li>
                            <li>Refunds processed within 5-7 business days</li>
                            <li>Exchange option available for different sizes or colors</li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 text-center">Our Commitment to You</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <Globe className="h-8 w-8 mx-auto text-black mb-2" />
                            <h4 className="text-lg font-semibold text-gray-900">Global Reach</h4>
                            <p className="text-sm text-gray-600 mt-2">Delivering luxury worldwide with care and precision</p>
                        </div>
                        <div className="text-center">
                            <Clock className="h-8 w-8 mx-auto text-black mb-2" />
                            <h4 className="text-lg font-semibold text-gray-900">Timely Service</h4>
                            <p className="text-sm text-gray-600 mt-2">Swift processing and shipping to meet your needs</p>
                        </div>
                        <div className="text-center">
                            <ShieldCheck className="h-8 w-8 mx-auto text-black mb-2" />
                            <h4 className="text-lg font-semibold text-gray-900">Secure Packaging</h4>
                            <p className="text-sm text-gray-600 mt-2">Your items arrive in perfect condition, every time</p>
                        </div>
                    </div>
                </div>

                <div className="bg-black text-white p-8 space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <HelpCircle className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold">Need Assistance?</h3>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Our dedicated customer service team is here to help with any questions about shipping, returns, or exchanges. We're committed to ensuring your shopping experience is as luxurious as our products.
                    </p>
                </div>

                <div className="text-center space-y-6">
                    <p className="text-lg text-gray-700 italic">
                        "Exceptional service from start to finish"
                    </p>
                    <a href="#" className="inline-block bg-black text-white px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-900 transition duration-150 ease-in-out">
                        Contact Customer Service
                    </a>
                </div>
            </div>
        </div>
    )
}