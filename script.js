let filters = {
         brightness: {
                  value: 100,
                  min: 0,
                  max: 200,
                  unit: "%"
         },
         contrast: {
                  value: 100,
                  min: 0,
                  max: 200,
                  unit: "%"
         },
         saturation: {
                  value: 0,
                  min: 0,
                  max: 200,
                  unit: "%"
         },
         hueRotation: {
                  value: 0,
                  min: 0,
                  max: 360,
                  unit: "deg"
         },
         blur: {
                  value: 0,
                  min: 0,
                  max: 20,
                  unit: "px"
         },
         grayscale: {
                  value: 0,
                  min: 0,
                  max: 100,
                  unit: "%"
         },
         sepia: {
                  value: 0,
                  min: 0,
                  max: 100,
                  unit: "%"
         },
         opacity: {
                  value: 100,
                  min: 0,
                  max: 100,
                  unit: "%"
         },
         invert: {
                  value: 0,
                  min: 0,
                  max: 100,
                  unit: "%"
         },
}
const imageCanvas = document.querySelector("#image-canvas")
const imgInput = document.querySelector("#image-input")
const filtersContainer = document.querySelector(".filters")
const canvasCtx = imageCanvas.getContext("2d")
const resetBtn = document.querySelector("#reset-btn")
const downloadBtn = document.querySelector("#download-btn")
const presetsContainer = document.querySelector(".presets")
let file = null
let image = null


function createFilterElement(name, unit = "%", value, min, max) {
         const div = document.createElement("div")
         div.classList.add("filter")

         const input = document.createElement("input")
         input.type = "range"
         input.min = min
         input.max = max
         input.value = value
         input.id = name

         const p = document.createElement("p")
         p.innerHTML = name

         div.appendChild(p)
         div.appendChild(input)

         input.addEventListener("input", (event) => {
                  filters[name].value = event.target.value
                  applyFilters()
         })

         return div
}
function createFilters() {
         Object.keys(filters).forEach(key => {
                  const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
                  filtersContainer.appendChild(filterElement)
         })
}
createFilters()

imgInput.addEventListener("change", (event) => {
         file = event.target.files[0]
         const imagePlaceholder = document.querySelector(".placeholder")
         imageCanvas.style.display = "block"
         imagePlaceholder.style.display = "none"

         const img = new Image()
         img.src = URL.createObjectURL(file)

         img.onload = () => {
                  image = img
                  imageCanvas.width = img.width
                  imageCanvas.height = img.height
                  canvasCtx.drawImage(img, 0, 0)
         }
})
function applyFilters() {
         canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
         canvasCtx.filter = `
         brightness(${filters.brightness.value}${filters.brightness.unit})
         contrast(${filters.contrast.value}${filters.contrast.unit})
         saturate(${filters.saturation.value}${filters.saturation.unit})
         hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
         blur(${filters.blur.value}${filters.blur.unit})
         grayscale(${filters.grayscale.value}${filters.grayscale.unit})
         sepia(${filters.sepia.value}${filters.sepia.unit})
         opacity(${filters.opacity.value}${filters.opacity.unit})
         invert(${filters.invert.value}${filters.invert.unit}) 
         `.trim()
         canvasCtx.drawImage(image, 0, 0)
}
function resetFilters() {
         resetBtn.addEventListener("click", () => {
                  filters = {
                           brightness: {
                                    value: 100,
                                    min: 0,
                                    max: 200,
                                    unit: "%"
                           },
                           contrast: {
                                    value: 100,
                                    min: 0,
                                    max: 200,
                                    unit: "%"
                           },
                           saturation: {
                                    value: 0,
                                    min: 0,
                                    max: 200,
                                    unit: "%"
                           },
                           hueRotation: {
                                    value: 0,
                                    min: 0,
                                    max: 360,
                                    unit: "deg"
                           },
                           blur: {
                                    value: 0,
                                    min: 0,
                                    max: 20,
                                    unit: "px"
                           },
                           grayscale: {
                                    value: 0,
                                    min: 0,
                                    max: 100,
                                    unit: "%"
                           },
                           sepia: {
                                    value: 0,
                                    min: 0,
                                    max: 100,
                                    unit: "%"
                           },
                           opacity: {
                                    value: 100,
                                    min: 0,
                                    max: 100,
                                    unit: "%"
                           },
                           invert: {
                                    value: 0,
                                    min: 0,
                                    max: 100,
                                    unit: "%"
                           },
                  }
                  applyFilters()
                  filtersContainer.innerHTML = ""
                  createFilters()
         })
}
resetFilters()

function downloadImage() {
         downloadBtn.addEventListener("click", () => {
                  const link = document.createElement("a")
                  link.download = "edited-image.png"
                  link.href = imageCanvas.toDataURL()
                  link.click()
         })
}
downloadImage()

const presets = {
         drama: {
                  brightness: 110,
                  contrast: 130,
                  saturation: 120,
                  hueRotation: 0,
                  blur: 0,
                  grayscale: 10,
                  sepia: 0,
                  opacity: 100,
                  invert: 0,
         },
         vintage: {
                  brightness: 90,
                  contrast: 110,
                  saturation: 80,
                  hueRotation: 15,
                  blur: 0,
                  grayscale: 20,
                  sepia: 40,
                  opacity: 100,
                  invert: 0,
         },
         oldschool: {
                  brightness: 95,
                  contrast: 120,
                  saturation: 60,
                  hueRotation: 0,
                  blur: 0,
                  grayscale: 50,
                  sepia: 30,
                  opacity: 100,
                  invert: 0,
         },
         cyberpunk: {
                  brightness: 110,
                  contrast: 140,
                  saturation: 160,
                  hueRotation: 290,
                  blur: 0,
                  grayscale: 0,
                  sepia: 0,
                  opacity: 100,
                  invert: 0,
         },
         softGlow: {
                  brightness: 120,
                  contrast: 90,
                  saturation: 110,
                  hueRotation: 0,
                  blur: 2,
                  grayscale: 0,
                  sepia: 10,
                  opacity: 100,
                  invert: 0,
         },
         noir: {
                  brightness: 80,
                  contrast: 130,
                  saturation: 0,
                  hueRotation: 0,
                  blur: 0,
                  grayscale: 100,
                  sepia: 10,
                  opacity: 100,
                  invert: 0,
         },
         warmSunset: {
                  brightness: 105,
                  contrast: 115,
                  saturation: 120,
                  hueRotation: 20,
                  blur: 0,
                  grayscale: 0,
                  sepia: 30,
                  opacity: 100,
                  invert: 0,
         },
         coolTone: {
                  brightness: 100,
                  contrast: 110,
                  saturation: 90,
                  hueRotation: 200,
                  blur: 0,
                  grayscale: 5,
                  sepia: 0,
                  opacity: 100,
                  invert: 0,
         },
         faded: {
                  brightness: 105,
                  contrast: 80,
                  saturation: 70,
                  hueRotation: 0,
                  blur: 0,
                  grayscale: 10,
                  sepia: 20,
                  opacity: 100,
                  invert: 0,
         },
         retroPop: {
                  brightness: 115,
                  contrast: 130,
                  saturation: 150,
                  hueRotation: 45,
                  blur: 0,
                  grayscale: 0,
                  sepia: 0,
                  opacity: 100,
                  invert: 0,
         },
}

Object.keys(presets).forEach(presetName => {
         const presetButton = document.createElement("button")
         presetButton.classList.add("btn")
         presetButton.innerHTML = presetName
         presetsContainer.appendChild(presetButton)

         presetButton.addEventListener('click', () => {
                  const preset = presets[presetName]
                  Object.keys(preset).forEach(filterName =>{
                           filters[filterName].value = preset[filterName]
                  })
                  applyFilters()
                  filtersContainer.innerHTML = ""
                  createFilters()
         })
})