import type { ProjectEstimate } from "../domain/project-estimate";

export function recommendEquipment(
  project: ProjectEstimate
): ProjectEstimate {
  const items = [...project.equipment.recommendedItems];

  function add(
    category: string,
    description: string,
    quantity: number,
    manufacturer: string,
    model: string,
    reason: string
  ) {
    if (quantity <= 0) return;

    const exists = items.some(
      (i) =>
        i.description === description &&
        i.model === model
    );

    if (exists) return;

    items.push({
      category,
      description,
      quantity,
      manufacturer,
      model,
      reason,
    });
  }

  const cameraCount =
    (project.cameras.interiorCount.value ?? 0) +
    (project.cameras.exteriorCount.value ?? 0) +
    (project.cameras.specialtyCount.value ?? 0);

  if (cameraCount > 0) {
    add(
      "camera",
      "Commercial IP Camera",
      cameraCount,
      "Ubiquiti",
      "G5 Bullet",
      "Camera count discovered during AI interview."
    );

    add(
      "recording",
      "Network Video Recorder",
      1,
      "Ubiquiti",
      "UNVR",
      "Required for video storage."
    );

    add(
      "storage",
      "16TB Surveillance Drive",
      Math.max(
        2,
        Math.ceil(cameraCount / 16)
      ),
      "Western Digital",
      "Purple Pro",
      "Estimated recording capacity."
    );
  }

  const aps =
    project.wifi.estimatedAccessPointCount.value ?? 0;

  if (aps > 0) {
    add(
      "wifi",
      "Enterprise Access Point",
      aps,
      "Ubiquiti",
      "U7 Pro",
      "Coverage estimate."
    );
  }

  const doors =
    project.accessControl.controlledDoorCount.value ?? 0;

  if (doors > 0) {
    add(
      "access_control",
      "Access Reader",
      doors,
      "Ubiquiti",
      "UA Reader",
      "One reader per controlled door."
    );

    add(
      "access_control",
      "Door Controller",
      doors,
      "Ubiquiti",
      "UA Hub",
      "Controller allowance."
    );
  }

  project.equipment.recommendedItems = items;

  return project;
}