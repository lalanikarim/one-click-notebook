function create_buttons() {
	var colab = document.createElement("a")
	colab.href = 'https://one-click-notebook.one-click-notebook.workers.dev/?on=colab&url=' + window.location
	var colab_img = document.createElement("img")
	colab_img.src = "https://colab.research.google.com/assets/colab-badge.svg"
	colab_img.alt = "Open in Colab"
	colab.append(colab_img)
	element.append(colab)
	var paperspace = document.createElement("a")
	paperspace.href = 'https://one-click-notebook.one-click-notebook.workers.dev/?on=paperspace&url=' + window.location
	var paperspace_img = document.createElement("img")
	paperspace_img.src = "https://assets.paperspace.io/img/gradient-badge.svg"
	paperspace_img.alt = "Run on Gradient"
	paperspace.append(paperspace_img)
	element.append(paperspace)
}

create_buttons()
