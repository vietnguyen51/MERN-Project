import React from 'react'
import { Leaf, Recycle, Heart, Globe } from 'lucide-react'

export default function Sustainability() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-10"
             style={{
                 backgroundColor:  'rgba(248, 247, 245, 1)'
             }}
        >
            <div className="max-w-4xl w-full space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-wider">Sustainability</h2>
                    <div className="mt-2 h-1 w-20 bg-black mx-auto"></div>
                    <p className="mt-4 text-sm text-gray-600 italic">
                        Luxury with responsibility
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <Leaf className="h-6 w-6 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Eco-Friendly Materials</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            We prioritize the use of sustainable, organic, and recycled materials in our collections, reducing our environmental impact without compromising on quality or style.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <Recycle className="h-6 w-6 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Circular Fashion</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Our commitment to circular fashion includes designing for longevity, offering repair services, and implementing take-back programs to ensure our products have a sustainable lifecycle.
                        </p>
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">Our Commitment</h3>
                    <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                        We believe that luxury and sustainability go hand in hand. Our goal is to lead the fashion industry towards a more sustainable future, setting new standards for eco-conscious luxury.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <Heart className="h-6 w-6 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Ethical Production</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            We ensure fair labor practices and safe working conditions throughout our supply chain, partnering only with manufacturers who share our values and meet our strict ethical standards.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <Globe className="h-6 w-6 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Global Initiatives</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Our sustainability efforts extend beyond our products. We actively participate in global environmental initiatives and support local communities in regions where we operate.
                        </p>
                    </div>
                </div>

                <div className="text-center space-y-6">
                    <p className="text-lg text-gray-700 italic">
                        "Sustainability is not just a trend, it's our responsibility and our future."
                    </p>
                    <a href="#" className="inline-block bg-black text-white px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-900 transition duration-150 ease-in-out">
                        Learn More About Our Initiatives
                    </a>
                </div>
            </div>
        </div>
    )
}