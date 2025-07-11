import { getBg, getGray300Or600, getWhiteOrGray700 } from '@/app/utils/theme';
import Button from '../../Button';
import { FREQUENCIES } from '@/app/utils/frequencies';
import { MultiSelect } from './MultiSelect';

export default function FiltersModal({ filters, setFilters, onApply, onClose, tags, theme }) {
    const unselectedBtnClass =
        theme === 'dark'
            ? '!bg-gray-700 !text-gray-100 !hover:bg-gray-600'
            : '!bg-gray-200 !text-black !hover:bg-gray-300';

    const selectedBtnClass = '!text-white !bg-[#2549BE]';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className={`${getBg(theme)} rounded-2xl shadow-lg p-6 w-[90%] max-w-md border-2 border-[#2549BE]`}
            >
                <h2 className="text-center text-lg font-semibold mb-4">Filtrar Hábitos</h2>

                <div className="mb-4">
                    <p className={`${getWhiteOrGray700(theme)} font-medium mb-1`}>Status</p>
                    <div className="flex gap-2 flex-wrap">
                        <Button
                            onClick={() => setFilters({ ...filters, status: 'concluded' })}
                            className={`px-3 py-1 rounded-md ${
                                filters.status === 'concluded'
                                    ? selectedBtnClass
                                    : unselectedBtnClass
                            }`}
                        >
                            Concluído
                        </Button>
                        <Button
                            onClick={() => setFilters({ ...filters, status: 'notConcluded' })}
                            className={`px-3 py-1 rounded-md ${
                                filters.status === 'notConcluded'
                                    ? selectedBtnClass
                                    : unselectedBtnClass
                            }`}
                        >
                            Não concluído
                        </Button>
                    </div>
                </div>

                <div className="mb-4">
                    <p className={`${getWhiteOrGray700(theme)} font-medium mb-1`}>Ordem</p>
                    <div className="flex gap-2 flex-wrap">
                        <Button
                            onClick={() => setFilters({ ...filters, order: 'alphabetical' })}
                            className={`px-3 py-1 rounded-md ${
                                filters.order === 'alphabetical'
                                    ? selectedBtnClass
                                    : unselectedBtnClass
                            }`}
                        >
                            Alfabética
                        </Button>
                        <Button
                            onClick={() => setFilters({ ...filters, order: 'duration' })}
                            className={`px-3 py-1 rounded-md ${
                                filters.order === 'duration' ? selectedBtnClass : unselectedBtnClass
                            }`}
                        >
                            Duração
                        </Button>
                    </div>
                </div>

                <div className="mb-6">
                    <p className={`${getWhiteOrGray700(theme)} font-medium mb-1`}>Frequência</p>
                    <div className="flex gap-2 flex-wrap">
                        {Object.entries(FREQUENCIES).map(([value, label]) => (
                            <Button
                                key={value}
                                onClick={() => setFilters({ ...filters, frequency: value })}
                                className={`px-3 py-1 rounded-md ${
                                    filters.frequency === value
                                        ? selectedBtnClass
                                        : unselectedBtnClass
                                }`}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                </div>

                <MultiSelect
                    id="tags"
                    name="tags"
                    label="Tags"
                    placeholder="Selecione as tags"
                    options={tags.map((t) => ({ value: t.name, label: t.name }))}
                    value={filters.selectedTags || []}
                    onChange={(selected) => setFilters({ ...filters, selectedTags: selected })}
                    theme={theme}
                />

                <Button
                    onClick={onApply}
                    className="bg-[#2549BE] hover:bg-blue-800 text-white w-full py-2 rounded-md font-semibold mb-2"
                >
                    Aplicar filtros
                </Button>
                <button
                    onClick={onClose}
                    className={`${getGray300Or600(theme)} text-sm underline w-full text-center hover:cursor-pointer`}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
