import React from 'react'

function AddPromotion() {
    return (
        <div class="max-w-md mx-auto bg-white shadow-lg rounded-md p-6">
            <h1 class="text-2xl font-bold mb-4">Add Promotion</h1>
            <form>
                <div class="mb-4">
                    <label for="title" class="block text-gray-700">Title</label>
                    <input type="text" id="title" name="title" class="form-input mt-1 block w-full rounded-md border-gray-300" placeholder="Enter title" />
                </div>
                <div class="mb-4">
                    <label for="discount" class="block text-gray-700">Discount</label>
                    <input type="text" id="discount" name="discount" class="form-input mt-1 block w-full rounded-md border-gray-300" placeholder="Enter discount" />
                </div>
                <div class="mb-4">
                    <label for="start-date" class="block text-gray-700">Start Date</label>
                    <input type="date" id="start-date" name="start-date" class="form-input mt-1 block w-full rounded-md border-gray-300" />
                </div>
                <div class="mb-6">
                    <label for="end-date" class="block text-gray-700">End Date</label>
                    <input type="date" id="end-date" name="end-date" class="form-input mt-1 block w-full rounded-md border-gray-300" />
                </div>
                <div class="flex justify-center">
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Promotion</button>
                </div>
            </form>
        </div>

    )
}

export default AddPromotion