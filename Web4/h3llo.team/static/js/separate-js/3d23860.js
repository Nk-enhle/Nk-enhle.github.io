var canvas2 = document.getElementById('share');

canvas2.setAttribute('width', canvas2.parentElement.clientWidth);
canvas2.setAttribute('height', canvas2.parentElement.clientWidth);

var scene2 = new THREE.Scene();
var camera2 = new THREE.PerspectiveCamera(45, canvas2.parentElement.clientWidth / canvas2.parentElement.clientWidth, 1, 50);
camera2.position.x = 3.5;
camera2.position.z = 3.5;
camera2.position.y = 3.5;

camera2.lookAt({x: 0, y: 0, z: 0})
var renderer2 = new THREE.WebGLRenderer({alpha: true, canvas: canvas2});
renderer2.setClearColor(0x000000, 0);


window.addEventListener('resize', function () {
    camera2.aspect = canvas2.parentElement.clientWidth / canvas2.parentElement.clientWidth;
    camera2.updateProjectionMatrix();
    renderer2.setSize(canvas2.parentElement.clientWidth, canvas2.parentElement.clientWidth);
});


var sphereGroup = new THREE.Group()
var geometry2 = new THREE.SphereGeometry(2, 32, 32);
var geometry2_2 = new THREE.SphereGeometry(.2, 32, 32);


var loader2 = new THREE.TextureLoader();
var texture2 = loader2.load('/share.png');
texture2.wrapS = THREE.RepeatWrapping;
texture2.wrapT = THREE.RepeatWrapping;
texture2.repeat.set(1, 1);
var material2 = new THREE.MeshBasicMaterial({
    map: texture2,
    transparent: true,
    side: THREE.BackSide,
    // depthWrite: true,
    opacity: 1
});

var material2_2 = new THREE.MeshBasicMaterial({
    color: 0xff0134,
    // depthWrite: true,
});
var sphere2 = new THREE.Mesh(geometry2, material2);
var sphere2_2 = new THREE.Mesh(geometry2_2, material2_2);


var materialIn2 = new THREE.MeshBasicMaterial({
    map: texture2,
    transparent: true,
    side: THREE.FrontSide,
    // depthWrite: true,
    opacity: 1
});
var sphereIn2 = new THREE.Mesh(geometry2, materialIn2);

var sphereGroupIn = new THREE.Group();


sphereGroupIn.add(sphereIn2);
sphereGroupIn.add(sphere2);

sphereGroup.add(sphereGroupIn);
scene2.add(sphereGroup);

scene2.add(sphere2_2);

sphereGroup.slide = 0;


var materialline_0 = new THREE.LineBasicMaterial({
    color: 0x1d2026,
    // linewidth: 1,
    // opacity: .2
});

var materialline_1 = new THREE.LineBasicMaterial({
    color: 0x1d2026,
    // linewidth: 1,
    // opacity: .2
});

var materialline_2 = new THREE.LineBasicMaterial({
    color: 0x1d2026,
    // linewidth: 1,
    // opacity: .2
});

var geometryline_0 = new THREE.Geometry();
geometryline_0.vertices.push(
    new THREE.Vector3(0, -10, 0),
    new THREE.Vector3(0, 10, 0)
);
var sphereLine_0 = new THREE.Line(geometryline_0, materialline_0);
scene2.add(sphereLine_0);


var geometryline_1 = new THREE.Geometry();
geometryline_1.vertices.push(
    new THREE.Vector3(0, 0, -10),
    new THREE.Vector3(0, 0, 10)
);
var sphereLine_1 = new THREE.Line(geometryline_1, materialline_1);
scene2.add(sphereLine_1);

var geometryline_2 = new THREE.Geometry();
geometryline_2.vertices.push(
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(10, 0, 0)
);
var sphereLine_2 = new THREE.Line(geometryline_2, materialline_2);
scene2.add(sphereLine_2);


render2();

function render2() {
    animate2();

    requestAnimationFrame(render2);
}

function animate2() {
    sphereGroupIn.rotation.y += 0.01;
    renderer2.render(scene2, camera2);
}

function nextSphere(speed, pause) {

    TweenMax.to(
        sphereGroup.scale,
        speed,
        {
            x: 0.001,
            y: 0.001,
            z: 0.001,
            yoyo: true,
            repeat: 1,
            ease: Power0.easeNone,
            onRepeat: function () {

                nextSphereCount(speed, pause)
            }
        }
    );
    TweenMax.to(
        sphereGroupIn.rotation,
        speed * 2,
        {
            y: sphereGroupIn.rotation.y + Math.PI * 2,
            ease: Power0.easeNone
        }
    );
}


function nextSphereCount(speed, pause) {


    ++sphereGroup.slide;

    if (sphereGroup.slide >= 3) {
        sphereGroup.slide = 0
    }
    $('.practices_item,.practices_n').removeClass('active');
    if (sphereGroup.slide == 0) {
        $('.practices_item-0').addClass('active');
        sphereGroup.rotation.set(0, 0, 0);
        materialline_0.color.setHex(0xff0134);
        materialline_1.color.setHex(0x1d2026);
        materialline_2.color.setHex(0x1d2026);
    }
    else if (sphereGroup.slide == 1) {
        $('.practices_item-1').addClass('active');
        sphereGroup.rotation.set(Math.PI / 2, 0, 0);
        materialline_0.color.setHex(0x1d2026);
        materialline_1.color.setHex(0xff0134);
        materialline_2.color.setHex(0x1d2026);
    }
    else if (sphereGroup.slide == 2) {
        $('.practices_item-2').addClass('active');
        sphereGroup.rotation.set(0, 0, Math.PI / 2);
        materialline_0.color.setHex(0x1d2026);
        materialline_1.color.setHex(0x1d2026);
        materialline_2.color.setHex(0xff0134);
    }
    setTimeout(function () {
        nextSphere(speed, pause)
    }, pause * 1000)
}