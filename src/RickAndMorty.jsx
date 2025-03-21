import React from "react";

const RickAndMorty = ({ personajes }) => {

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Contenedor centrado */}
                <div className="flex justify-center">
                    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-y-16">
                        {personajes.map((personaje) => (
                            <li key={personaje.id}>
                                <div className="w-64 h-80 bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                                    <img
                                        alt={personaje.name}
                                        src={personaje.image}
                                        className="w-24 h-24 rounded-full border-4 border-indigo-500"
                                    />
                                    <div className="text-center mt-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{personaje.name}</h3>
                                        <p className="text-sm font-medium text-indigo-600">{personaje.status}</p>
                                        <p className="text-sm text-gray-700">{personaje.species}</p>
                                        {personaje.type && <p className="text-sm text-gray-500">{personaje.type}</p>}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default RickAndMorty;
