-- CreateIndex
CREATE INDEX `User_status_idx` ON `User`(`status`);

-- CreateIndex
CREATE INDEX `User_advisorId_role_idx` ON `User`(`advisorId`, `role`);
