//constants and functions for text inputs
const postTitle = document.getElementById('postTitle');
const postSubtitle = document.getElementById('postSubtitle');
const articleTitle = document.getElementById('articleTitle');
const articleSubitle = document.getElementById('articleSubtitle');
const postcardTitle = document.getElementById('postcardTitle');
const postcardSubitle = document.getElementById('postcardSubtitle');
const authorName = document.getElementById('authorName');
const postcardAuthorName = document.getElementById('postcardAuthorName');
const date = document.getElementById('date');
const datePreview = document.getElementById('datePreview');
const contentText = document.getElementById('contentText');
const imgData = {
    AuthorPhoto: '',
    AuthorPhotoName: '',
    PostPhoto: '',
    PostPhotoName: '',
    ArticlePhoto: '',
};

const showTitlePreview = function () {
	if (postTitle.value) {
        articleTitle.innerHTML = postTitle.value;
        postcardTitle.innerHTML = postTitle.value;
	} else {
        articleTitle.innerHTML = 'New Post';
        postcardTitle.innerHTML = 'New Post';
  	}
}

const showSubtitlePreview = function() {
    if (postSubtitle.value) {
        articleSubitle.innerHTML = postSubtitle.value;
        postcardSubitle.innerHTML = postSubtitle.value;
    } else {
        articleSubitle.innerHTML = 'Please, enter any description';
        postcardSubitle.innerHTML = 'Please, enter any description';
    }
}

const showAuthorNamePreview = function() {
    if (authorName.value) {
        postcardAuthorName.innerHTML = authorName.value;
    } else {
        postcardAuthorName.innerHTML = 'Enter author name';
    }
}

const showDatePreview = function() {
    if (date.value) {
        datePreview.innerHTML = date.value;
    } else {
        datePreview.innerHTML = 'yyyy-mm-dd';
    }
}

const textFunctions = function() {
    postTitle.addEventListener('input', showTitlePreview);
    postSubtitle.addEventListener('input', showSubtitlePreview);
    authorName.addEventListener('input', showAuthorNamePreview);
    date.addEventListener('input', showDatePreview);
}

textFunctions();

//constants and functions for author photo input
const previewAuthorPhotoDiv = document.getElementById('profilePhoto');
const inputAuthorPhoto = document.getElementById('authorPhoto');
const previewAuthorPhoto = document.getElementById('profilePhotoPlaceholder');
const uploadAuthorPhotoButton = document.getElementById('uploadAuthorPhoto');
const newOrRemoveAuthorPhoto = document.getElementById('newRemoveAuthorPhoto');
const removeAuthorPhotoButton = document.getElementById('removeAuthorPhoto');
const postcardPreviewAuthorPhotoDiv = document.getElementById('authorPic');
const postcardPreviewAuthorPhoto = document.getElementById('authorPicPlaceholder');

const uploadAuthorPhoto = function() {
    const file = inputAuthorPhoto.files[0];
    const reader = new FileReader();

    reader.addEventListener(
        'load',
        function() {
            previewAuthorPhotoDiv.classList.add('hidden');
            postcardPreviewAuthorPhotoDiv.classList.add('hidden');
            previewAuthorPhoto.src = reader.result;
            postcardPreviewAuthorPhoto.src = reader.result;
            previewAuthorPhoto.classList.remove('hidden');
            postcardPreviewAuthorPhoto.classList.remove('hidden');
            uploadAuthorPhotoButton.classList.add('hidden');
            newOrRemoveAuthorPhoto.classList.add('flex');
            imgData.AuthorPhoto = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
        imgData.AuthorPhotoName = file.name;
    }
}

const removeAuthorPhoto = function() {
    newOrRemoveAuthorPhoto.classList.remove('flex');
    uploadAuthorPhotoButton.classList.remove('hidden');
    previewAuthorPhoto.classList.add('hidden');
    postcardPreviewAuthorPhoto.classList.add('hidden');
    inputAuthorPhoto.value = '';
    previewAuthorPhoto.src = '';
    postcardPreviewAuthorPhoto.src = '';
    previewAuthorPhotoDiv.classList.remove('hidden');
    postcardPreviewAuthorPhotoDiv.classList.remove('hidden');
    imgData.AuthorPhoto = '';
    imgData.AuthorPhotoName = '';
}

const authorPhotoFunctions = function() {
    inputAuthorPhoto.addEventListener('change', uploadAuthorPhoto);
    removeAuthorPhotoButton.addEventListener('click', removeAuthorPhoto);
}

authorPhotoFunctions();

//constants and functions for big photo input
const inputBigPhoto = document.getElementById('bigPhoto');
const previewBigPhotoDiv = document.getElementById('uploadPhotoBig');
const previewBigPhoto = document.getElementById('uploadPhotoBigPlaceholder');
const bigPhotoHint = document.getElementById('bigPhotoHint');
const newOrRemoveBigPhoto = document.getElementById('newRemoveBigPhoto');
const articlePreviewPhotoDiv = document.getElementById('articlePhoto');
const articlePreviewPhoto = document.getElementById('articlePhotoPlaceholder');
const removeBigPhotoButton = document.getElementById('removeBigPhoto');

const uploadBigPhoto = function() {
    const file = inputBigPhoto.files[0];
    const reader = new FileReader();

    reader.addEventListener(
        'load',
        function() {
            previewBigPhotoDiv.classList.remove('flex');
            previewBigPhoto.classList.remove('hidden');
            previewBigPhoto.src = reader.result;
            bigPhotoHint.classList.add('hidden');
            newOrRemoveBigPhoto.classList.add('flex');
            articlePreviewPhotoDiv.classList.add('hidden');
            articlePreviewPhoto.classList.remove('hidden');
            articlePreviewPhoto.src = reader.result;
            imgData.ArticlePhoto = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
}

const removeBigPhoto = function() {
    articlePreviewPhoto.src = '';
    articlePreviewPhoto.classList.add('hidden');
    articlePreviewPhotoDiv.classList.remove('hidden');
    newOrRemoveBigPhoto.classList.remove('flex');
    bigPhotoHint.classList.remove('hidden');
    previewBigPhoto.src = '';
    inputBigPhoto.value = '';
    previewBigPhoto.classList.add('hidden');
    previewBigPhotoDiv.classList.add('flex');
    imgData.ArticlePhoto = '';
}

const bigPhotoFunctions = function() {
    inputBigPhoto.addEventListener('change', uploadBigPhoto);
    removeBigPhotoButton.addEventListener('click', removeBigPhoto);
}

bigPhotoFunctions();

//constants and functions for small photo input
const inputSmallPhoto = document.getElementById('smallPhoto');
const previewSmallPhotoDiv = document.getElementById('uploadPhotoSmall');
const previewSmallPhoto = document.getElementById('uploadPhotoSmallPlaceholder');
const smallPhotoHint = document.getElementById('smallPhotoHint');
const newOrRemoveSmallPhoto = document.getElementById('newRemoveSmallPhoto');
const postcardPreviewPhotoDiv = document.getElementById('postcardPhoto');
const postcardPreviewPhoto = document.getElementById('postcardPhotoPlaceholder');
const removeSmallPhotoButton = document.getElementById('removeSmallPhoto');

const uploadSmallPhoto = async function() {
    const file = inputSmallPhoto.files[0];
    const reader = new FileReader();

    reader.addEventListener(
        'load',
        function() {
            previewSmallPhotoDiv.classList.remove('flex');
            previewSmallPhoto.classList.remove('hidden');
            previewSmallPhoto.src = reader.result;
            smallPhotoHint.classList.add('hidden');
            newOrRemoveSmallPhoto.classList.add('flex');
            postcardPreviewPhotoDiv.classList.add('hidden');
            postcardPreviewPhoto.classList.remove('hidden');
            postcardPreviewPhoto.src = reader.result;
            imgData.PostPhoto = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
        imgData.PostPhotoName = file.name;
    }
}

const removeSmallPhoto = function() {
    postcardPreviewPhoto.src = '';
    postcardPreviewPhoto.classList.add('hidden');
    postcardPreviewPhotoDiv.classList.remove('hidden');
    newOrRemoveSmallPhoto.classList.remove('flex');
    smallPhotoHint.classList.remove('hidden');
    previewSmallPhoto.src = '';
    inputSmallPhoto.value = '';
    previewSmallPhoto.classList.add('hidden');
    previewSmallPhotoDiv.classList.add('flex');
    imgData.PostPhoto = '';
    imgData.PostPhotoName = '';
}

const smallPhotoFunctions = function() {
    inputSmallPhoto.addEventListener('change', uploadSmallPhoto);
    removeSmallPhotoButton.addEventListener('click', removeSmallPhoto);
}

smallPhotoFunctions();

//publish new post
const publishButton = document.getElementById('publish');

const publishNewPost = function() {
    if (!postTitle.value || !postSubtitle.value || !authorName.value) {
        console.log('Error');
    } else {
        console.log(JSON.stringify({
            title: postTitle.value,
            subtitle: postSubtitle.value,
            author: authorName.value,
            publishDate: date.value,
            content: contentText.value,
            authorImg: imgData.AuthorPhoto,
            imgModifier: imgData.PostPhoto,
            articlePhoto: imgData.ArticlePhoto,
        }));
    }
}

const createNewPost = async function() {
    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            title: postTitle.value,
            subtitle: postSubtitle.value,
            author: authorName.value,
            publishDate: date.value,
            content: contentText.value,
            authorImg: imgData.AuthorPhoto,
            authorImgName: imgData.AuthorPhotoName,
            imgModifier: imgData.PostPhoto,
            imgModifierName: imgData.PostPhotoName,
            articlePhoto: imgData.ArticlePhoto,
        })
    });

    console.log(response.ok);
}

publishButton.addEventListener('click', publishNewPost);