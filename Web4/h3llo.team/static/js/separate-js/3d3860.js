var material, loader, line, anim = {camera: 4, opacity: -1, elem: 0, next: false, rotation: -3};
var materialTest, renderStart;
var objects = [];
var group, nextElem;
var canvas = document.getElementById('three');
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);


var renderer = new THREE.WebGLRenderer({alpha: true, canvas: canvas});
renderer.setClearColor(0x000000, 0);
camera.position.z = 5;

// var light = new THREE.AmbientLight(0xFFFFFF);
// scene.add(light);


material();

var test = new THREE.Mesh(new THREE.BoxGeometry(.01, .01, .01), materialTest);
var test2 = new THREE.Mesh(new THREE.BoxGeometry(.01, .01, .01), materialTest);
var test3 = new THREE.Mesh(new THREE.BoxGeometry(.01, .01, .01), materialTest);
var test4 = new THREE.Mesh(new THREE.BoxGeometry(.01, .01, .01), materialTest);
var test5 = new THREE.Mesh(new THREE.BoxGeometry(.01, .01, .01), materialTest);
var test6 = new THREE.Mesh(new THREE.BoxGeometry(.01, .01, .01), materialTest);
objects[0] = {obj: test, text: 'Person'};
objects[1] = {obj: test2, text: 'Event'};
objects[2] = {obj: test3, text: 'Product'};
objects[3] = {obj: test4, text: 'Company'};
objects[4] = {obj: test5, text: 'Brand'};
objects[5] = {obj: test6, text: 'World'};

var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
    renderStart = 1;
};
var onProgress = function (xhr) {
    renderStart = 1;
};
var onError = function (xhr) {
};

var loader = new THREE.OBJLoader(manager);

loader.load('/TheRock2.obj', function (object) {
    renderStart = 0;
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = material3;
        }
    });
    object.scale.set(.005, .005, .005);
    object.rotation.x = .4;
    object.visible = false;
    // objects.push(object);
    objects[0] = {obj: object, text: 'Person'};

    scene.add(object);
    animate()
}, onProgress, onError);


loader.load('/micro.obj', function (object) {
    renderStart = 0;
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = material;
        }
    });
    object.rotation.z = .2;
    object.rotation.x = .2;
    object.scale.set(.008, .008, .008);
    object.visible = false;
    // objects.push(object);
    objects[1] = {obj: object, text: 'Event'};
    scene.add(object);
    animate()
}, onProgress, onError);


group = new THREE.Object3D();
var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
var cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material_2);
cube.renderOrder = 2;
group.rotation.x = .5;
group.add(cube);
group.add(cube2);
group.visible = false;
objects[2] = {obj: group, text: 'Product'};
scene.add(group);


loader.load('/suitcase.obj', function (object) {
    renderStart = 0;
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = material4_4;
        }
    });
    object.scale.set(.005, .005, .005);
    object.rotation.x = .2;
    object.rotation.z = .2;
    object.visible = false;
    objects[3] = {obj: object, text: 'Company'};
    scene.add(object);
    animate()
}, onProgress, onError);


loader.load('/cup.obj', function (object) {
    renderStart = 0;
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = material4;
        }
    });
    object.rotation.z = .2;
    object.rotation.x = .2;
    object.scale.set(.12, .12, .12);
    object.visible = false;
    // objects.push(object);
    objects[4] = {obj: object, text: 'Brand'};
    scene.add(object);
    animate()
}, onProgress, onError);


group = new THREE.Object3D();
var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 32, 32), material2);
var sphere2 = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 32, 32), material2_2);
sphere.renderOrder = 2;
group.position.z = -1;
group.add(sphere);
group.add(sphere2);
group.visible = false;
objects[5] = {obj: group, text: 'World'};
scene.add(group);


window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
var timeStart;
function time() {
    timeStart = 1
}
var twin1 = TweenMax.to(anim, 2, {
    camera: 3,
    opacity: 4,
    repeat: -1,
    yoyo: true,
}).pause();
var twin2 = TweenMax.to(anim, 4, {
    rotation: 2,
    repeat: -1,
    ease: SlowMo.ease.config(0.6, 0.6, false)
}).pause();
function animate() {
    if (objects[0] && objects[1] && objects[2] && objects[3]) {
        if (renderStart == 1 && docScroll < docHeight / 2) {
            if (twin1._paused && twin2._paused && timeStart == 1) {
                twin1.play();
                twin2.play();
            }
            if (anim.elem != nextElem) {
                nextElem = anim.elem;
                for (var i = 0; i < objects.length; i++) {
                    objects[i].obj.visible = false;
                    document.getElementById('t_' + objects[i].text).className = 'head_title_text';
                }
                objects[anim.elem].obj.visible = true;
                document.getElementById('title').innerText = objects[anim.elem].text;
                document.getElementById('t_' + objects[anim.elem].text).className = 'head_title_text active';
            }
            objects[anim.elem].obj.rotation.y = anim.rotation;

            document.getElementById('title').style.opacity = anim.opacity;
            canvas.style.opacity = anim.opacity + 1;
            if (anim.opacity <= -.5 && anim.next == true) {
                anim.elem++;
                if (anim.elem >= objects.length) {
                    anim.elem = 0;
                }
                anim.next = false;
            }
            else if (anim.opacity >= 1 && anim.next == false) {
                anim.next = true;
            }
            camera.position.z = anim.camera;
            renderer.render(scene, camera);
        }
        else {
            if (!twin1._paused && !twin2._paused) {
                twin1.pause();
                twin2.pause();
            }
        }
    }
}
function render() {
    if (docScroll >= canvas.offsetTop && (canvas.offsetTop + canvas.clientHeight) >= (docScroll - docHeight)) {
        animate()
    }
    requestAnimationFrame(render);
}

function material() {
    var transparent = true;

    if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
        transparent = false;
    }

    var op = 1;
    if (docWidth < 1000) {
        op = 3;
    }
    loader = new THREE.TextureLoader();
    line = loader.load('/line.png');
    line.wrapS = THREE.RepeatWrapping;
    line.wrapT = THREE.RepeatWrapping;
    line.repeat.set(1, .1);
    material = new THREE.MeshBasicMaterial({
        map: line,
        transparent: transparent,
        side: THREE.FrontSide,
        depthWrite: true,
        opacity: op
    });
    material_2 = new THREE.MeshBasicMaterial({
        map: line,
        transparent: transparent,
        side: THREE.BackSide,
        depthWrite: true,
        opacity: op
    });


    line2 = loader.load('/lineE.png');
    material2 = new THREE.MeshBasicMaterial({
        map: line2,
        transparent: transparent,
        side: THREE.FrontSide,
        opacity: op
    });
    material2_2 = new THREE.MeshBasicMaterial({
        map: line2,
        transparent: transparent,
        side: THREE.BackSide,
        opacity: op
    });
    line3 = loader.load('/line.png');
    line3.wrapS = THREE.RepeatWrapping;
    line3.wrapT = THREE.RepeatWrapping;
    line3.repeat.set(2, .1);
    material3 = new THREE.MeshBasicMaterial({
        map: line3,
        transparent: transparent,
        depthWrite: true,
        opacity: op,

    });
    line4 = loader.load('/line3.png');
    material4 = new THREE.MeshBasicMaterial({
        map: line4,
        transparent: transparent,
        side: THREE.FrontSide,
        opacity: op,

    });

    material4_4 = new THREE.MeshBasicMaterial({
        map: line4,
        transparent: transparent,
        side: THREE.BackSide,
        opacity: op,
        color: 0xffffff,
    });
    materialTest = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0
    })
}