${replies.length > 0 ? `
    <div class="ml-8 mt-2 space-y-2">
        ${replies.map(reply => {
const replyUser = reply.user;
return `
                <div class="flex space-x-3">
                    <img src="${replyUser.profileImageURL ? replyUser.profileImageURL : placeHolderPfp}" alt="Profile" class="rounded-full w-6 h-6">
                    <div class="flex-1">
                        <div class="bg-gray-50 rounded-lg p-2">
                            <div class="flex items-center space-x-2">
                                <span class="font-semibold text-sm">${replyUser.firstName} ${replyUser.lastName}</span>
                                <span class="text-gray-500 text-xs">${formatTimestamp(reply.creationDate)}</span>
                            </div>
                            <p class="text-sm mt-1">${reply.content}</p>
                        </div>
                    </div>
                </div>
            `;
}).join('')}
    </div>
` : ''}