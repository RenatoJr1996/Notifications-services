-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipientId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "readAt" DATETIME,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Notifications" ("category", "content", "createAt", "id", "readAt", "recipientId") SELECT "category", "content", "createAt", "id", "readAt", "recipientId" FROM "Notifications";
DROP TABLE "Notifications";
ALTER TABLE "new_Notifications" RENAME TO "Notifications";
CREATE INDEX "Notifications_recipientId_idx" ON "Notifications"("recipientId");
PRAGMA foreign_key_check("Notifications");
PRAGMA foreign_keys=ON;
