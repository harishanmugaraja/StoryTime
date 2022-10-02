from webui import txt2img
import sys

def generate(prompt):
    options = {
        'ddim_steps': 50,
        'toggles': [1, 2, 3],
        'sampler_name': 'k_lms',
        'ddim_eta': 0.0,
        'n_iter': 1,
        'batch_size': 1,
        'cfg_scale': 7.5,
        'seed': '',
        'height': 512,
        'width': 512,
        'fp': None,
        'variant_amount': 0.0,
        'variant_seed': '',
        'submit_on_enter': 'Yes',
    }
    print(options)
    imgs, _, _, _ = txt2img(
        "",
        options["ddim_steps"],
        options["sampler_name"],
        options["toggles"],
        "",
        options["ddim_eta"],
        options["n_iter"],
        options["batch_size"],
        options["cfg_scale"],
        options["seed"],
        options["height"],
        options["width"],
        options["fp"],
        options["variant_amount"],
        options["variant_seed"],
        None
    )
    print(imgs)

if __name__ == "__main__":
    generate(sys.argv[1])