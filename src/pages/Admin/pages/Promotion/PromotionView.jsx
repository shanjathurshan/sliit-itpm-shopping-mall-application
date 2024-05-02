import React from 'react'

function PromotionView() {
    return (
        <div class="max-w-md mx-auto bg-white shadow-lg rounded-md p-6">
            <h1 class="text-2xl font-bold mb-4">View Promotion</h1>
            <form>
                <div class="mb-4">
                    <label for="title" class="block text-gray-700">Title</label>
                    <input disabled type="text" id="title" name="title" class="form-input mt-1 block w-full rounded-md border-gray-300" placeholder="Enter title" value={"Offer 1"} />
                </div>
                <div class="mb-4">
                    <label for="discount" class="block text-gray-700">Discount</label>
                    <input disabled type="text" id="discount" name="discount" class="form-input mt-1 block w-full rounded-md border-gray-300" placeholder="Enter discount" value={"20%"} />
                </div>
                <div class="mb-4">
                    <label for="start-date" class="block text-gray-700">Start Date</label>
                    <input disabled type="date" id="start-date" name="start-date" class="form-input mt-1 block w-full rounded-md border-gray-300" value={"2024-03-20"} />
                </div>
                <div class="mb-6">
                    <label for="end-date" class="block text-gray-700">End Date</label>
                    <input disabled type="date" id="end-date" name="end-date" class="form-input mt-1 block w-full rounded-md border-gray-300" value={"2024-03-31"} />
                </div>
                <div class="flex justify-center">
                    <button onClick={() => { window.location.replace("/admin/promotion-list") }} type="button" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Back</button>
                </div>
            </form>
        </div>

    )
}

export default PromotionView