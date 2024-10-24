import React from 'react'
import { Award, Star, Users } from 'lucide-react'

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8"
             style={{
                 backgroundColor:  'rgba(248, 247, 245, 1)'
             }}
        >
            <div className="max-w-3xl w-full space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-wider">About Us</h2>
                    <div className="mt-2 h-1 w-20 bg-black mx-auto"></div>
                    <p className="mt-4 text-sm text-gray-600 italic">
                        Crafting luxury experiences since 1961
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="flex justify-center items-center w-12 h-12 mx-auto bg-black rounded-full">
                            <Award className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Excellence</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Uncompromising quality in every stitch and design
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="flex justify-center items-center w-12 h-12 mx-auto bg-black rounded-full">
                            <Star className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Innovation</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Pushing boundaries in fashion and luxury
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="flex justify-center items-center w-12 h-12 mx-auto bg-black rounded-full">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Community</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Building a global family of style enthusiasts
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Founded in 1961, our brand has been at the forefront of luxury fashion for over six decades. We blend timeless elegance with modern innovation, creating pieces that are not just clothing, but works of art. Our commitment to quality, creativity, and sustainability drives everything we do.
                    </p>
                </div>

                <div className="bg-gray-50 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Legacy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Heritage</h4>
                            <p className="text-sm text-gray-600">
                                With roots in Parisian haute couture, we've dressed icons and influenced fashion for generations.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Future</h4>
                            <p className="text-sm text-gray-600">
                                We're committed to sustainable practices and innovative designs that will shape the future of fashion.
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}