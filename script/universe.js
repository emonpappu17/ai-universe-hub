const loadData = async (isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    const data = await res.json()
    const AllData = data.data.tools
    manageData(AllData, isShowAll)
}

const manageData = (AllData, isShowAll) => {
    const cardContainer = document.getElementById('card-container');
    const showAllContainer = document.getElementById('show-all-btn');
    if (!isShowAll) {
        AllData = AllData.slice(0, 6);
    }
    if (AllData.length === 12) {
        showAllContainer.classList.add('hidden')
    }

    AllData.forEach(sinData => {
        // console.log(sinData);
        const toolCard = document.createElement('div');
        toolCard.classList = 'w-full border p-7 space-y-3 rounded-2xl'
        toolCard.innerHTML = `
        <img class="rounded-2xl" src="${sinData.image}" alt="Photo not found" >
            <h2 class="text-[25px] font-semibold">Features</h2>
            <ol class="mt-1 space-y-1 list-decimal list-inside text-[#585858]">
                <li>${sinData.features[0]}</li>
                <li>${sinData.features[1]}</li>
                <li>${sinData.features[2]}</li>
            </ol>
            <hr class="h-px my-2 bg-gray-200 border-1 ">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-[25px] font-semibold">${sinData.name}</h1>
                    <p>${sinData.published_in}</p>
                </div>
                <button onclick="toolModalData('${sinData.id}')" class="btn rounded-full text-[#EB5757] bg-red-100"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        `;
        cardContainer.appendChild(toolCard);
    });
};

const toolModalData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const data = await res.json()
    const toolDetails = data.data
    console.log(toolDetails);
    toolDetail(toolDetails);
};

const toolDetail = (toolDetails) => {
    const modalCardContainer = document.getElementById('modal-card-container');
    modalCardContainer.innerHTML = `
      <!-- card 1 -->
                <div class="w-[500px] bg-[#EB57570D] p-8 space-y-5 rounded-3xl border border-[#EB5757]">
                    <h3 class="text-[25px] font-semibold">${toolDetails.description}</h3>
                    <div class=" flex justify-between gap-5">
                        <div class="text-[#03A30A] font-bold p-6 bg-white rounded-2xl">
                            <span>${toolDetails.pricing[0].price}</span>
                            <span>${toolDetails.pricing[0].plan}</span>
                        </div>
                        <div class="text-[#03A30A] font-bold p-6 bg-white rounded-2xl">
                            <span>${toolDetails.pricing[1].price}</span>
                            <span>${toolDetails.pricing[1].plan}</span>
                        </div>
                        <div class="text-[#03A30A] font-bold p-6 bg-white rounded-2xl">
                            <span>${toolDetails.pricing[2].price}</span>
                            <span>${toolDetails.pricing[2].plan}</span>
                        </div>
                    </div>
                    <div class=" flex justify-between">
                        <div>
                            <h2 class="text-[25px] font-semibold">Features</h2>
                            <ul class="mt-2 space-y-1 list-disc list-inside">
                                <li>${toolDetails.features[1].feature_name}</li>
                                <li>${toolDetails.features[2].feature_name}</li>
                                <li>${toolDetails.features[3].feature_name}</li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="text-[25px] font-semibold">Integrations</h2>
                            <ul class="mt-2 space-y-1 list-disc list-inside">
                                <li>${toolDetails.integrations[0]}</li>
                                <li>${toolDetails.integrations[1]}</li>
                                <li>${toolDetails.integrations[2]}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- card 2 -->
                <div class="w-[500px] p-8 space-y-5 rounded-3xl border">
                    <img src="${toolDetails.image_link[0]}"
                        alt="">
                    <h2 class="text-[25px] font-semibold">${toolDetails.input_output_examples[0].input}</h2>
                    <p>${toolDetails.input_output_examples[0].output}</p>
                </div>
    `
    my_modal_5.showModal()
};

// show all button
const handleShowAll = () => {
    loadData(true);
};

loadData();