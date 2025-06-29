export default function TagsModal({ newTag, setNewTag, onAddTag, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white border-2 border-yellow-400 rounded-2xl shadow-lg p-6 w-[90%] max-w-md">
                <h2 className="text-center text-lg font-semibold mb-4">Adicione uma tag</h2>
                <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Nome da Tag"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
                />
                <button
                    onClick={onAddTag}
                    className="bg-[#FDC43A] hover:bg-yellow-400 text-white w-full py-2 rounded font-semibold mb-2"
                >
                    Adicionar
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
