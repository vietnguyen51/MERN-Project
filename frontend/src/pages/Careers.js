import React from 'react'
import { Briefcase, Star, Zap, Users, ChevronRight } from 'lucide-react'

export default function Careers() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 p-10"
             style={{
                 backgroundColor:  'rgba(248, 247, 245, 1)'
             }}
        >
            <div className="max-w-4xl w-full space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-wider">Careers</h2>
                    <div className="mt-2 h-1 w-20 bg-black mx-auto"></div>
                    <p className="mt-4 text-sm text-gray-600 italic">
                        Join our team of visionaries and innovators
                    </p>
                </div>

                <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">Why Join Us?</h3>
                    <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                        At our company, we believe in pushing the boundaries of luxury fashion. We offer a dynamic work environment where creativity thrives and innovation is celebrated.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <Star className="h-6 w-6 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Excellence in Craft</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Work alongside world-class artisans and designers, honing your skills in an environment that demands and rewards excellence.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <Zap className="h-6 w-6 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Innovation-Driven</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Be at the forefront of fashion technology and sustainable practices, driving the industry forward with groundbreaking ideas.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 text-center">Open Positions</h3>
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-6 flex justify-between items-center">
                            <div className="space-y-1">
                                <h4 className="text-lg font-semibold text-gray-900">Senior Fashion Designer</h4>
                                <p className="text-sm text-gray-600">Paris, France</p>
                            </div>
                            <a href="#" className="text-black hover:text-gray-700 transition-colors duration-300">
                                <ChevronRight className="h-6 w-6" />
                            </a>
                        </div>
                        <div className="bg-gray-50 p-6 flex justify-between items-center">
                            <div className="space-y-1">
                                <h4 className="text-lg font-semibold text-gray-900">Digital Marketing Specialist</h4>
                                <p className="text-sm text-gray-600">New York, USA</p>
                            </div>
                            <a href="#" className="text-black hover:text-gray-700 transition-colors duration-300">
                                <ChevronRight className="h-6 w-6" />
                            </a>
                        </div>
                        <div className="bg-gray-50 p-6 flex justify-between items-center">
                            <div className="space-y-1">
                                <h4 className="text-lg font-semibold text-gray-900">Sustainability Coordinator</h4>
                                <p className="text-sm text-gray-600">Milan, Italy</p>
                            </div>
                            <a href="#" className="text-black hover:text-gray-700 transition-colors duration-300">
                                <ChevronRight className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-black text-white p-8 space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold">Our Culture</h3>
                    </div>
                    <p className="text-sm leading-relaxed">
                        We foster a culture of creativity, inclusivity, and continuous learning. Our team members are passionate about fashion, sustainability, and making a positive impact in the world.
                    </p>
                </div>

                <div className="text-center space-y-6">
                    <p className="text-lg text-gray-700 italic">
                        "Join us in shaping the future of luxury fashion."
                    </p>
                    <a href="#" className="inline-block bg-black text-white px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-900 transition duration-150 ease-in-out">
                        View All Opportunities
                    </a>
                </div>
            </div>
        </div>
    )
}