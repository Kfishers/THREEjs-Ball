
//Loader
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/Images/NormalMap.png')
    // Debug
    //const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(1, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = .5
material.roughness = .4
material.normalMap = normalTexture

material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights

//Light1
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 0.74
pointLight.position.y = 0.95
pointLight.position.z = -1.78
pointLight.intensity = 0.2
scene.add(pointLight)

//Light2
const pointLight2 = new THREE.PointLight(0xff0000, 1)
pointLight2.position.set(-3.68, -3, -2.17)
pointLight2.intensity = .3

scene.add(pointLight2)

// const light1 = gui.addFolder('Light 1')

// light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
// light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
// light1.add(pointLight2, 'intensity').min(0).max(20).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)

// scene.add(pointLightHelper)



//light3
const pointLight3 = new THREE.PointLight(0x132eaa, 1)

pointLight3.position.set(2.8, 0.9, -3)
pointLight3.intensity = .53
scene.add(pointLight3)

// const light2 = gui.addFolder('Light 2')

// light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
// light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
// light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
// light2.add(pointLight3, 'intensity').min(0).max(20).step(0.01)

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)

// const light2Color = {
//     color: 0x000FF
// }
// light2.addColor(light2Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light2Color.color)
//     })

// scene.add(pointLightHelper2)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const parallaxSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}
window.addEventListener('scroll', parallaxSphere)

const clock = new THREE.Clock()

const tick = () => {
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .04 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()