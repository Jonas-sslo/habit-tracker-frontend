import { getBg, getGray300Or600 } from '@/app/utils/theme';
import Button from '../../Button';
import Input from '../auth/Input';

export default function TagsModal({ newTag, setNewTag, onAddTag, onClose, theme }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className={`${getBg(theme)} border-2 border-yellow-400 rounded-2xl shadow-lg p-6 w-[90%] max-w-md`}
            >
                <h2 className="text-center text-lg font-semibold mb-4 light:text-black">
                    Adicione uma tag
                </h2>
                <Input
                    id="tag"
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Nome da Tag"
                    className="focus:ring-yellow-400"
                />
                <Button
                    onClick={onAddTag}
                    color='yellow'
                    className="hover:bg-yellow-400 text-white w-full py-2 rounded-md font-semibold mb-2 focus:ring-yellow-400"
                >
                    Adicionar
                </Button>

                <button
                    onClick={onClose}
                    className={`${getGray300Or600(theme)} text-sm underline w-full text-center`}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
