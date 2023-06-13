/*
  Warnings:

  - You are about to drop the column `id_group` on the `t_agenda_usuario` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_agenda_usuario] DROP COLUMN [id_group];

-- CreateTable
CREATE TABLE [dbo].[t_agenda_grupo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [id_appointment] INT NOT NULL,
    [id_group] INT NOT NULL,
    CONSTRAINT [t_agenda_grupo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_agenda_grupo] ADD CONSTRAINT [t_agenda_grupo_id_appointment_fkey] FOREIGN KEY ([id_appointment]) REFERENCES [dbo].[t_agenda]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_agenda_grupo] ADD CONSTRAINT [t_agenda_grupo_id_group_fkey] FOREIGN KEY ([id_group]) REFERENCES [dbo].[t_grupo_usuario]([id_grupo]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
