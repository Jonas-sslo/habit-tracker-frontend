export default function FiltersModal({ filters, setFilters, onClose }) {
    const frequencies = ['Daily', 'Weekly', 'Monthly', 'Anualy'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md border-2 border-[#2549BE]">
                <h2 className="text-center text-lg font-semibold mb-4">Filtrar Hábitos</h2>

                <div className="mb-4">
                    <p className="font-medium mb-1">Status</p>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setFilters({ ...filters, status: 'concluded' })}
                            className={`px-3 py-1 rounded ${filters.status === 'concluded' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Concluído
                        </button>
                        <button
                            onClick={() => setFilters({ ...filters, status: 'notConcluded' })}
                            className={`px-3 py-1 rounded ${filters.status === 'notConcluded' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Não concluído
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="font-medium mb-1">Order</p>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setFilters({ ...filters, order: 'alphabetical' })}
                            className={`px-3 py-1 rounded ${filters.order === 'alphabetical' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Alfabética
                        </button>
                        <button
                            onClick={() => setFilters({ ...filters, order: 'duration' })}
                            className={`px-3 py-1 rounded ${filters.order === 'duration' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Duração
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="font-medium mb-1">Frequência</p>
                    <div className="flex gap-2 flex-wrap">
                        {frequencies.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilters({ ...filters, frequency: f })}
                                className={`px-3 py-1 rounded ${filters.frequency === f ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="bg-[#2549BE] hover:bg-blue-800 text-white w-full py-2 rounded font-semibold mb-2"
                >
                    Aplicar filters
                </button>
                <button
                    onClick={onClose}
                    className="text-sm text-gray-500 underline w-full text-center"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
