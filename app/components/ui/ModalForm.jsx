import { Form } from 'react-router';

export default function ModalForm({
  isOpen,
  onClose,
  defaultValues,
  error,
  onOptimisticSubmit,
}) {
  if (!isOpen) return null;

  const {
    id = '',
    name = '',
    amount = '',
    category = '',
    isUpdate = false,
    type = '',
  } = defaultValues;

  const isRepeated =
    defaultValues.repetitionPeriod && defaultValues.repetitionPeriod !== 'None';

  return (
    <div className="fixed inset-0 flex justify-center  items-center z-50">
      <div
        className=" fixed inset-0 bg-black opacity-80 -z-10"
        onClick={onClose}
      />
      <div className="bg-[#1b2055] p-6 rounded-xl w-[600px]">
        <h2 className="text-xl font-semibold mb-4">
          {isUpdate ? 'Edit' : 'Add'} {type}
        </h2>

        <Form
          method="post"
          className="flex flex-col gap-4"
          onSubmit={e => {
            onOptimisticSubmit?.(Object.fromEntries(new FormData(e.target)));
          }}
        >
          <input type="hidden" name="isUpdate" value={isUpdate} />
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="id" value={id} />

          <label>
            Name:
            <input
              name="name"
              defaultValue={name}
              className="w-full border p-2"
              required
            />
          </label>

          <label>
            Amount:
            <input
              type="number"
              name="amount"
              defaultValue={amount}
              className="w-full border p-2"
              required
            />
          </label>

          <label>
            Category:
            <input
              name="category"
              defaultValue={category}
              className="w-full border p-2"
              required
            />
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isRepeated"
              defaultChecked={isRepeated}
            />
            Is Repeated
          </label>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#8B0000] text-white hover:bg-[#a30000] px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#1B1B40] text-white hover:bg-[#2a2a5a] px-4 py-2 rounded"
            >
              {isUpdate ? 'Update' : 'Add'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
